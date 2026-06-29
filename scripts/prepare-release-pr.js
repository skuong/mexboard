#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import semanticRelease from 'semantic-release';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const result = await semanticRelease(
	{
		dryRun: true,
	},
	{
		cwd: rootDir,
		env: process.env,
		stderr: process.stderr,
		stdout: process.stderr,
	},
);

if (!result) {
	console.log('No release needed');
	process.exit(0);
}

const version = result.nextRelease.version;
const notes = result.nextRelease.notes?.trim();

if (!version) {
	console.error('No release version found');
	process.exit(1);
}

if (!notes) {
	console.error('No release notes generated');
	process.exit(1);
}

execFileSync(process.execPath, [join(rootDir, 'scripts', 'sync-version.js'), version], {
	cwd: rootDir,
	stdio: 'inherit',
});

const changelogPath = join(rootDir, 'CHANGELOG.md');
const changelog = existsSync(changelogPath) ? readFileSync(changelogPath, 'utf-8') : '';
const firstLine = notes.split('\n', 1)[0];

if (changelog.startsWith(firstLine)) {
	console.log(`CHANGELOG.md already starts with ${firstLine}`);
} else {
	const updatedChangelog = changelog.trim() ? `${notes}\n\n${changelog.trimStart()}` : `${notes}\n`;

	writeFileSync(changelogPath, updatedChangelog, 'utf-8');
	console.log(`Updated CHANGELOG.md for ${version}`);
}
