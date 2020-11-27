import fetch from 'node-fetch';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { lookpath } from 'lookpath';
import { gt as semverGt } from 'semver';

import { ProgressLocation, window, env, Uri } from 'vscode';
import verifyIntegity from './utils/integrity';

const execAsync = promisify(exec);

export interface Release {
  name: string;
  changelogUrl: string;
  version: string;
  checksumsUrl: string;
  checksumsSignatureUrl: string;
  binaryUrl: string;
}

const headers = {
  // eslint-disable-next-line
  Accept: 'application/json',

  // eslint-disable-next-line
  'Content-Type': 'application/json'
};

export async function getCurrentVersion(binaryPath: string): Promise<string | undefined> {
  const versionString = await execAsync(`${binaryPath} --version`);
  return versionString.stdout.split(' ').pop();
}

export async function getLatestReleaseInfo(): Promise<Release> {
  const res = await fetch('https://api.github.com/repos/nimblebun/tsc-language-server/releases/latest', { headers })
    .then(res => res.json());

  const changelogUrl = res.html_url;
  const version = res.name;

  let arch = process.arch;
  if (arch === 'x64') {
    arch = 'amd64';
  }

  if (arch === 'ia32') {
    arch = '386';
  }

  let platform = process.platform.toString();
  if (platform === 'win32') {
    platform = 'windows';
    arch = `${arch}.exe`; // saving an extra op here
  }

  const checksums = res.assets.find((a: any) => a.name === `tsc-ls_${version.slice(1)}_SHA256SUM`);
  const binary = res.assets.find((a: any) => a.name === `tsc-ls_${version.slice(1)}_${platform}_${arch}`);

  if (!checksums) {
    throw new Error('Failed to download checksums to check file integrity.');
  }

  if (!binary) {
    throw new Error('No binary releases for your OS/arch.');
  }

  const checksumsSignatureUrl = `${checksums.browser_download_url}.sig`;

  return {
    name: binary.name,
    changelogUrl,
    version,
    checksumsUrl: checksums.browser_download_url,
    checksumsSignatureUrl,
    binaryUrl: binary.browser_download_url
  };
};

export function removeOldBinary(binaryPath: string) {
  if (!fs.existsSync(binaryPath)) {
    return;
  }

  fs.unlinkSync(binaryPath);
};

export async function downloadBinary(release: Release, targetPath: string) {
  const res = await fetch(release.binaryUrl);

  return new Promise<void>((resolve, reject) => {
    res.body.pipe(fs.createWriteStream(targetPath));
    res.body.on('error', reject);
    res.body.on('end', resolve);
  });
};

async function install(release: Release, targetPath: string) {
  return new Promise<void>(resolve => {
    removeOldBinary(targetPath);

    window.withProgress({
      cancellable: true,
      location: ProgressLocation.Notification,
      title: 'Installing TSC language server',
    }, async (progress, _) => {
      progress.report({ message: 'Downloading binary...', increment: 40 });
      await downloadBinary(release, targetPath);

      progress.report({ message: 'Verifying integrity...', increment: 40 });
      await verifyIntegity(release, targetPath);
      fs.chmodSync(targetPath, 0o700);

      return resolve();
    });
  });
}

export async function getLanguageServerPath(extensionDir: string): Promise<string> {
  if (await lookpath('tsc-ls')) {
    return 'tsc-ls';
  }

  await mkdirp(`${extensionDir}/lsp`);

  let localServer = `${extensionDir}/lsp/tsc-ls`;

  if (process.platform.toString() === 'win32') {
    localServer = `${localServer}.exe`;
  }

  const isInstalled = fs.existsSync(localServer);
  let doUpdate = false;

  const latestRelease = await getLatestReleaseInfo();

  if (isInstalled) {
    const currentVersion = await getCurrentVersion(localServer);

    if (!currentVersion) {
      // something happened, try to return the path anyway
      return localServer;
    }

    if (semverGt(latestRelease.version, currentVersion)) {
      const choice = await window.showInformationMessage(`Update available for the TSC language server (${latestRelease.version}). Do you want to install it?`, 'Yes', 'No');
      if (choice === 'No') {
        return localServer;
      }

      doUpdate = true;
    }

    if (!doUpdate) {
      return localServer;
    }
  }

  try {
    await install(latestRelease, localServer);
  } catch (err) {
    window.showErrorMessage(`Failed to install tsc-ls: ${err}.`);
  }

  window.showInformationMessage(`Installed TSC Language Server ${latestRelease.version}.`, 'View Changelog')
    .then(choice => {
      if (choice === 'View Changelog') {
        env.openExternal(Uri.parse(latestRelease.changelogUrl));
      }
    });

  return localServer;
};
