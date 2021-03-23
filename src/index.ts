import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as installer from './installer';

async function run() {
    try {
        const version = core.getInput('version') || 'latest';
        const workdir = core.getInput('workdir') || '.';
        const tag = core.getInput('tag');

        const vummPath = await installer.installVersion(version);
        core.info('VUMM installed successfully');

        if (workdir && workdir !== '.') {
            core.info(`Using ${workdir} as working directory`);
            process.chdir(workdir);
        }

        const args: string[] = [];
        if (tag) {
            args.push(`-t ${tag}`);
        }

        core.info('Running VUMM Publish');
        await exec.exec(`${vummPath} publish ${args.join(' ')}`)
    } catch(err) {
        core.setFailed(err);
    }
}

run();