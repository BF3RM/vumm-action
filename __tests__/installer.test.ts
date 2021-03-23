import fs from 'fs';
import { installVersion } from "../src/installer";

describe('installer', () => {
    it('installs the latest version', async () => {
        const vummPath = await installVersion('latest');
        expect(fs.existsSync(vummPath)).toBeTruthy();
    });

    it('installs a specific version', async () => {
        const vummPath = await installVersion('v0.1.0');
        expect(fs.existsSync(vummPath)).toBeTruthy();
    });

    it('fails when invalid version provided', async () => {
        await expect(installVersion('notexisting')).rejects.toBeInstanceOf(Error);
    });
});