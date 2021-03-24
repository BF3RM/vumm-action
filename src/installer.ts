import { downloadTool, extractZip, extractTar, cacheDir } from '@actions/tool-cache';
import { HttpClient } from '@actions/http-client';
import { info, debug } from '@actions/core';
import os from 'os';
import path from 'path';

interface GitHubRelease {
    tag_name: string;
}

const org = 'BF3RM';
const repo = 'vumm-cli';
const osPlatform: string = os.platform();
const osArch: string = os.arch();

async function resolveTag(version: string): Promise<string | null> {
    const http = new HttpClient('vumm-action');

    const res = await http.getJson<GitHubRelease>(`https://github.com/${org}/${repo}/releases/${version}`);
    return res.result?.tag_name ?? null;
}

function resolveFilename(version: string) {
    const platform = osPlatform === 'win32' ? 'win' : osPlatform === 'darwin' ? 'macos' : 'linux';
    const arch = osArch === 'x64' ? '64' : '32';
    const ext = osPlatform === 'win32' ? 'zip' : 'tar.gz';

    return `vumm-${version.replace(/^v/, '')}-${platform}${arch}.${ext}`;
}

function resolveDownloadUrl(tag: string) {
    const filename = resolveFilename(tag);
    return `https://github.com/${org}/${repo}/releases/download/${tag}/${filename}`;
}

async function extractDownload(path: string) {
    if (osPlatform === 'win32')
        return await extractZip(path);

    return await extractTar(path);
}

/**
 * Install VUMM and return the path it's installed at
 * @param version version to install
 */
export async function installVersion(version: string): Promise<string> {
    const tag = await resolveTag(version);
    if (!tag) {
        throw new Error(`Failed to find VUMM release: ${version}`);
    }

    info(`Found VUMM version ${tag}`);
    const downloadUrl = resolveDownloadUrl(tag);
    
    info(`Downloading ${downloadUrl}`);
    const downloadPath = await downloadTool(downloadUrl);
    debug(`Downloaded to ${downloadPath}`);

    info(`Extracting...`);
    const extractedPath = await extractDownload(downloadPath);
    debug(`Extracted to ${extractedPath}`);

    const cachePath = await cacheDir(extractedPath, 'vumm-action', tag.replace(/^v/, ''));
    debug(`Cached to ${cachePath}`);

    const executable = path.join(cachePath, osPlatform === 'win32' ? 'vumm.exe' : 'vumm');
    debug(`Executable path is ${executable}`);

    return executable;
}