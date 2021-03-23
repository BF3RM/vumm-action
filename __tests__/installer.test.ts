import fs from 'fs';
import { installVUMM } from "../src/installer";

describe('installer', () => {
    it('installs the latest version', async () => {
        const vummPath = await installVUMM('latest');
        expect(fs.existsSync(vummPath)).toBeTruthy();
    });

    it('installs a specific version', async () => {
        const vummPath = await installVUMM('v0.1.0');
        expect(fs.existsSync(vummPath)).toBeTruthy();
    });

    it('fails when invalid version provided', async () => {
        await expect(installVUMM('notexisting')).rejects.toBeInstanceOf(Error);
    });
});