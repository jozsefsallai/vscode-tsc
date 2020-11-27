import * as crypto from 'crypto';
import * as fs from 'fs';
import { Release } from '../langserver';
import { download, downloadBuffer } from './download';

import * as openpgp from 'openpgp';

import publicKey from './publicKey';

const calculateFileChecksum = (filepath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');

    fs.createReadStream(filepath)
      .on('error', reject)
      .on('data', data => hash.update(data))
      .on('end', () => resolve(hash.digest('hex')));
  });
};

const downloadReleaseChecksum = async (release: Release): Promise<string> => {
  const checksum = await download(release.checksumsUrl);
  const signature = await downloadBuffer(release.checksumsSignatureUrl);

  const verifiedMessage = await openpgp.verify({
    message: openpgp.message.fromText(checksum),
    publicKeys: (await openpgp.key.readArmored(publicKey)).keys,
    signature: await openpgp.signature.read(signature)
  });

  const { valid } = verifiedMessage.signatures[0];

  if (!valid) {
    throw new Error('Failed to verify checksum signature.');
  }

  const target = checksum.split('\n').find(r => r.includes(release.name));
  if (!target) {
    throw new Error(`No checksum found for ${release.name}.`);
  }


  return target.split(/\s/g)[0];
};

const verifyIntegity = async (release: Release, filepath: string) => {
  const binaryChecksum = await calculateFileChecksum(filepath);
  const actualChecksum = await downloadReleaseChecksum(release);

  if (binaryChecksum !== actualChecksum) {
    throw new Error(`Checksum verification failed for ${release.name}: calculated "${binaryChecksum}" doesn't match actual "${actualChecksum}".`);
  }
};

export default verifyIntegity;
