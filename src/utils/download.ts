import fetch from 'node-fetch';

const download = async (url: string): Promise<string> => {
  const res = await fetch(url);
  return res.text();
};

const downloadBuffer = async (url: string): Promise<Buffer> => {
  const res = await fetch(url);
  return res.buffer();
};

export {
  download,
  downloadBuffer
};
