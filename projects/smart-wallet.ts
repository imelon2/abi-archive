import * as path from 'path';
import { glob,sync } from 'glob';
import { abiFile, ignore, seperateByJson } from "../src/utils";


export const genSmartWallet = async() => {
  const cwd = process.cwd();
  const coinbase_smart_wallet = path.join(cwd, `modules/smart-wallet/out/**/**/${abiFile}`);
  const allFiles = sync(coinbase_smart_wallet,{
    ignore:ignore
  });
  seperateByJson(allFiles);
}