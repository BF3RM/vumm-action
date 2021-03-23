import * as tmp from 'tmp';

tmp.setGracefulCleanup();
const tmpDir = tmp.dirSync({template: 'vumm-action-XXXXXX'});
process.env = Object.assign(process.env, {
    RUNNER_TEMP: tmpDir.name,
    RUNNER_TOOL_CACHE: tmpDir.name,
    GITHUB_ACTION: '1'
});