#!/usr/bin/env bun

/**
 * Validates all tsconfig.json files in the repository
 *
 * This script:
 * 1. Reads package.json exports to find all tsconfig files
 * 2. Validates each file can be parsed as JSON
 * 3. Uses TypeScript compiler API to validate the configuration
 * 4. Uses Deno types for deno.json validation
 * 5. Reports any errors found
 */

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

import ts from 'typescript';

interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
}

interface PackageJson {
  exports?: Record<string, string>;
}

interface TsConfigJson {
  compilerOptions?: {
    lib?: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Get all tsconfig files from package.json exports
 */
async function getTsconfigFiles(): Promise<string[]> {
  const rootDir = resolve(import.meta.dir, '..');
  const packageJsonPath = resolve(rootDir, 'package.json');

  try {
    const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
    const packageJson: PackageJson = JSON.parse(packageJsonContent);

    if (!packageJson.exports) {
      throw new Error('No exports found in package.json');
    }

    // Extract all the file paths from exports
    const configFiles = Object.values(packageJson.exports)
      .filter((path) => path.endsWith('.json'))
      .map((path) => resolve(rootDir, path));

    return configFiles;
  } catch (error) {
    throw new Error(
      `Failed to read tsconfig files from package.json: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Filter out Deno-specific libs from config for TypeScript validation
 */
function filterDenoLibs(config: TsConfigJson): TsConfigJson {
  if (!config.compilerOptions?.lib) {
    return config;
  }

  const denoSpecificLibs = [
    'Deno.NS',
    'deno.ns',
    'deno.window',
    'deno.worker',
  ];

  return {
    ...config,
    compilerOptions: {
      ...config.compilerOptions,
      lib: config.compilerOptions.lib.filter((lib: string) => !denoSpecificLibs.includes(lib)),
    },
  };
}

/**
 * Validate a single tsconfig file
 */
function validateTsconfigFile(filePath: string): ValidationResult {
  const result: ValidationResult = {
    errors: [],
    file: filePath,
    valid: true,
  };

  const fileName = filePath.split('/').pop() || filePath;
  const isDenoConfig = fileName === 'deno.json';

  try {
    // Read and parse the config file using TypeScript's API
    const configFile = ts.readConfigFile(filePath, ts.sys.readFile);

    if (configFile.error) {
      result.valid = false;
      result.errors.push(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
      return result;
    }

    // For Deno config, we need to handle Deno-specific lib options
    const configToValidate = isDenoConfig ? filterDenoLibs(configFile.config) : configFile.config;

    // Parse the JSON config with TypeScript's parser
    const parsedConfig = ts.parseJsonConfigFileContent(
      configToValidate,
      ts.sys,
      resolve(filePath, '..'),
      undefined,
      filePath,
    );

    // Check for errors in the parsed configuration
    if (parsedConfig.errors.length > 0) {
      result.valid = false;
      for (const error of parsedConfig.errors) {
        // Only report actual errors, not warnings
        if (error.category === ts.DiagnosticCategory.Error) {
          result.errors.push(ts.flattenDiagnosticMessageText(error.messageText, '\n'));
        }
      }
    }

    // If we found errors, mark as invalid
    if (result.errors.length > 0) {
      result.valid = false;
    }
  } catch (error) {
    result.valid = false;
    result.errors.push(error instanceof Error ? error.message : String(error));
  }

  return result;
}

/**
 * Print detailed error report for failed validations
 */
function printErrorReport(results: ValidationResult[]): void {
  console.log('\n❌ Validation failed with errors:\n');

  for (const result of results) {
    if (!result.valid) {
      const fileName = result.file.split('/').pop() || result.file;
      console.log(`  ${fileName}:`);
      for (const error of result.errors) {
        console.log(`    - ${error}`);
      }
      console.log();
    }
  }
}

/**
 * Main validation function
 */
async function main(): Promise<void> {
  console.log('🔍 Validating tsconfig files...\n');

  const tsconfigFiles = await getTsconfigFiles();
  console.log(`Found ${tsconfigFiles.length} config files to validate\n`);

  const results: ValidationResult[] = [];

  for (const file of tsconfigFiles) {
    const fileName = file.split('/').pop() || file;
    process.stdout.write(`  Validating ${fileName}... `);

    const result = validateTsconfigFile(file);
    results.push(result);

    if (result.valid) {
      console.log('✅');
    } else {
      console.log('❌');
    }
  }

  // Check if any validation failed
  const hasErrors = results.some((result) => !result.valid);

  if (hasErrors) {
    printErrorReport(results);
    process.exit(1);
  }

  console.log('\n✅ All tsconfig files are valid!');
}

// Run the validation
main().catch((error) => {
  console.error('❌ Validation script failed:', error);
  process.exit(1);
});
