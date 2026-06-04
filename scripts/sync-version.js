#!/usr/bin/env node

/**
 * Syncs version from package.json to Cargo.toml
 * This script is called by semantic-release to keep versions in sync
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const packageJsonPath = join(rootDir, 'package.json');
const cargoTomlPath = join(rootDir, 'src-tauri', 'Cargo.toml');
const tauriConfPath = join(rootDir, 'src-tauri', 'tauri.conf.json');

const requestedVersion = process.argv[2] || process.env.RELEASE_VERSION;

// Read current version from package.json
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const newVersion = requestedVersion || packageJson.version;

if (!newVersion) {
	console.error('No version found in package.json');
	process.exit(1);
}

if (requestedVersion) {
	packageJson.version = requestedVersion;
	writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, '\t')}\n`, 'utf-8');
	console.log(`Updated package.json version to ${requestedVersion}`);
}

// Update Cargo.toml
const cargoToml = readFileSync(cargoTomlPath, 'utf-8');
const updatedCargoToml = cargoToml.replace(/^version = ".*"$/m, `version = "${newVersion}"`);
writeFileSync(cargoTomlPath, updatedCargoToml, 'utf-8');
console.log(`Updated Cargo.toml version to ${newVersion}`);

// Update tauri.conf.json
const tauriConf = JSON.parse(readFileSync(tauriConfPath, 'utf-8'));

// Sanitize version for Tauri (especially Windows MSI/NSIS)
// Windows requires numeric-only pre-release identifiers
// 1.2.3-beta.1 -> 1.2.3-1
let tauriVersion = newVersion;
if (tauriVersion.includes('-')) {
	const parts = tauriVersion.split('-');
	const baseVersion = parts[0];
	const preRelease = parts.slice(1).join('-');

	const numericParts = preRelease.match(/\d+/g);
	if (numericParts) {
		tauriVersion = `${baseVersion}-${numericParts.join('.')}`;
	} else {
		tauriVersion = `${baseVersion}-0`;
	}
}

tauriConf.version = tauriVersion;
writeFileSync(tauriConfPath, `${JSON.stringify(tauriConf, null, 2)}\n`, 'utf-8');
console.log(`Updated tauri.conf.json version to ${tauriVersion} (sanitized from ${newVersion})`);
