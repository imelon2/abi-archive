import * as path from 'path';
import { glob } from 'glob';
import { seperateByJson } from '../src/utils/archive';


export const genGnosisSafe = async () => {
  const cwd = process.cwd();
  const gnosisSafeL2 = path.join(cwd, `source/GnosisSafe/GnosisSafeL2.json`);
  
  
  const allFiles = await glob([gnosisSafeL2]);

  seperateByJson(allFiles);
}