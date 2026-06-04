#!/usr/bin/env node

/**
 * Syncs version from package.json to Cargo.toml
 * This script is called by semantic-release to keep versions in sync
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const packageJsonPath = join(rootDir, 'package.json');
const cargoTomlPath = join(rootDir, 'src-tauri', 'Cargo.toml');
const tauriConfPath = join(rootDir, 'src-tauri', 'tauri.conf.json');

// Read current version from package.json
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const newVersion = packageJson.version;

if (!newVersion) {
	console.error('No version found in package.json');
	process.exit(1);
}

// Update Cargo.toml
const cargoToml = readFileSync(cargoTomlPath, 'utf-8');
const updatedCargoToml = cargoToml.replace(/^version = ".*"$/m, `version = "${newVersion}"`);
writeFileSync(cargoTomlPath, updatedCargoToml, 'utf-8');
console.log(`Updated Cargo.toml version to ${newVersion}`);

// Update tauri.conf.json
const tauriConf = JSON.parse(readFileSync(tauriConfPath, 'utf-8'));
tauriConf.version = newVersion;
writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2) + '\n', 'utf-8');
console.log(`Updated tauri.conf.json version to ${newVersion}`);
