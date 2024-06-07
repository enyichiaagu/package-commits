import path from 'node:path';
import { fileURLToPath } from 'node:url';

function globalPath(fileMetaURL) {
  const __filename = fileURLToPath(fileMetaURL);
  const __dirname = path.dirname(__filename);

  return { __filename, __dirname };
}

export default globalPath;
