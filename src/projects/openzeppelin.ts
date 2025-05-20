import * as path from 'path';
import { glob } from 'glob';
import { seperateByJson } from '../utils/archive';
import { abiFile } from '../utils/constant';


export const genOpenzeppelin = async () => {
  const cwd = process.cwd();
  const openzeppelinV4 = path.join(cwd, `node_modules/@openzeppelin/contracts-v4/build/contracts/${abiFile}`);
  const openzeppelinV5 = path.join(cwd, `node_modules/@openzeppelin/contracts-v5/build/contracts/${abiFile}`);
  const allFiles = await glob([openzeppelinV4, openzeppelinV5]);

  seperateByJson(allFiles);
}