import fs from 'fs/promises';

export async function readResume(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return data;
}
