import { glob } from "glob";
import { abiFile, seperateByJson } from "../src/utils";
import * as path from 'path';

export const genArbitrum = async () => {
  const cwd = process.cwd();
  const nitroContractV1_2_1 = path.join(cwd, `node_modules/@arbitrum/nitro-contracts-1.2.1/build/contracts/src/**/**/${abiFile}`);
  const nitroContractV3_1_0 = path.join(cwd, `node_modules/@arbitrum/nitro-contracts-3.1.0/build/contracts/src/**/**/${abiFile}`);
  const tokebBridgeContractV1_2_1 = path.join(cwd, `node_modules/@arbitrum/token-bridge-contracts-1.2.1/build/contracts/contracts/**/**/**/${abiFile}`);
  const allFiles = await glob([nitroContractV1_2_1, nitroContractV3_1_0, tokebBridgeContractV1_2_1]);

  seperateByJson(allFiles);
}

