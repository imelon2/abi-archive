import { glob } from "glob";
import { abiFile, seperateByJson } from "../src/utils";
import * as path from 'path';

export const genOffchainLabs = async () => {
  const cwd = process.cwd();
  const upgradeExecutorV1_1_1 = path.join(cwd, `node_modules/@offchainlabs/upgrade-executor/build/contracts/src/**/**/${abiFile}`);
  const allFiles = await glob([upgradeExecutorV1_1_1]);

  seperateByJson(allFiles);
};
