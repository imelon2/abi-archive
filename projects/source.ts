import * as path from 'path';
import { glob, sync } from 'glob';
import { seperateByJson } from '../src/utils/archive';
import { abiFile, ignore } from '../src/utils';


export const genSource = async () => {
  const cwd = process.cwd();
  const gnosisSafeL2 = path.join(cwd, `source/GnosisSafe/GnosisSafeL2.json`);
  const relayRouter = path.join(cwd, `source/RelayRouter/RelayRouter.json`);
  const zkEmail = sync(path.join(cwd, `source/ZkEmail/**/**/${abiFile}`),{
      ignore:ignore
    });
  
  
  
  
  const allFiles = await glob([gnosisSafeL2,relayRouter]);

  seperateByJson([...allFiles,...zkEmail]);
}