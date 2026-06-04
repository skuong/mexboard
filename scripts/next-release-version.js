#!/usr/bin/env node

import { appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import semanticRelease from 'semantic-release';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const setOutput = (name, value) => {
	const outputPath = process.env.GITHUB_OUTPUT;

	if (outputPath) {
		appendFileSync(outputPath, `${name}=${value}\n`, 'utf-8');
		return;
	}

	console.log(`${name}=${value}`);
};

try {
	const result = await semanticRelease(
		{
			ci: false,
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
		setOutput('released', 'false');
		setOutput('version', '');
		setOutput('tag', '');
		process.exit(0);
	}

	const version = result.nextRelease.version;

	setOutput('released', 'true');
	setOutput('version', version);
	setOutput('tag', `v${version}`);
} catch (error) {
	console.error(error);
	process.exit(1);
}
