import * as path from 'path';
import { glob } from 'glob';
import { seperateByJson } from '../src/utils/archive';
import { abiFile } from '../src/utils/constant';


export const genAccountAbstraction = async () => {
  const cwd = process.cwd();
  const accountAbstraction_0_6_0 = path.join(cwd, `node_modules/@account-abstraction/contracts-0.6.0/artifacts/${abiFile}`);
  const accountAbstraction_0_7_0 = path.join(cwd, `node_modules/@account-abstraction/contracts-0.7.0/artifacts/${abiFile}`);
  const accountAbstraction_0_8_0 = path.join(cwd, `node_modules/@account-abstraction/contracts-0.8.0/artifacts/${abiFile}`);
  
  
  const allFiles = await glob([accountAbstraction_0_6_0,accountAbstraction_0_7_0,accountAbstraction_0_8_0]);

  seperateByJson(allFiles);
}