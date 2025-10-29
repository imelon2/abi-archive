import * as path from 'path';
import { glob } from 'glob';
import { seperateByJson } from '../src/utils/archive';


export const genSource = async () => {
  const cwd = process.cwd();
  const gnosisSafeL2 = path.join(cwd, `source/GnosisSafe/GnosisSafeL2.json`);
  const relayRouter = path.join(cwd, `source/RelayRouter/RelayRouter.json`);
  const zkEmail_UniversalEmailRecoveryModule = path.join(cwd, `source/ZkEmail/UniversalEmailRecoveryModule.json`);
  
  
  const allFiles = await glob([gnosisSafeL2,relayRouter,zkEmail_UniversalEmailRecoveryModule]);

  seperateByJson(allFiles);
}