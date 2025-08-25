import { AbiCoder, ErrorFragment, ethers, EventFragment, FunctionFragment, id, JsonRpcProvider, ParamType } from 'ethers';
import { fuck, getSeletorByAbi, processArgs, processParam, strip0x } from '../src/utils';
import { requestAbi } from '../src/utils/http';
import fs from 'fs';
import { Abi, AbiFunction, getAbiItem, GetAbiItemParameters, parseAbiItem, parseAbiParameter, parseAbiParameters, toFunctionSignature } from 'viem';

async function main() {
  const provider = new JsonRpcProvider('');
  const tx = await provider.getTransaction('0x44e537b597b3a29c4328d9ceb016fb911fca4e818c0b9f21eefb6cabe257ec25');
  const hexSelector = strip0x(tx!.data);
  const index1 = hexSelector.slice(0, 2);
  const index2 = hexSelector.slice(2, 4);

  const { abi, url } = await requestAbi('function', index1, index2);
  const re = toFunctionSignature(abi[0])
console.log(re);
// console.log(abi[0].inputs);

}

void main();
