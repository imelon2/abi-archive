import { AbiCoder, ErrorFragment, ethers, EventFragment, FunctionFragment, id, JsonRpcProvider, ParamType } from 'ethers';
import { fuck, getSeletorByAbi, processArgs, processParam, strip0x } from '../src/utils';
import { requestAbi } from '../src/utils/http';
import fs from 'fs';

async function main() {
  const provider = new JsonRpcProvider('https://ethereum-mainnet.g.allthatnode.com/full/evm/5da65013a9004d8da1983f17cae83366');
//   const tx = await provider.getTransaction('0x51a163d0f9dc68a56c91e4bf52a215bfa6d6ef951e82d61a7356f76764402a96');
  const tx = await provider.getTransaction('0x44e537b597b3a29c4328d9ceb016fb911fca4e818c0b9f21eefb6cabe257ec25');
  const hexSelector = strip0x(tx!.data);
  const index1 = hexSelector.slice(0, 2);
  const index2 = hexSelector.slice(2, 4);

  const { abi, url } = await requestAbi('function', index1, index2);
    // const { abi } = JSON.parse(fs.readFileSync("/Users/choi/Documents/me/choiRepo/abi-archive/node_modules/@account-abstraction/contracts-0.6.0/artifacts/EntryPoint.json", 'utf8'));

//   console.log(abi);
//     console.log(url);


  const selectorAbi: any[] = [];
//   console.log("IS?");
  
  const i = new ethers.Interface(abi);
//   i.fragments.map((item) => {
//     console.log(item);
//     console.log();
    
//     console.log(item.inputs);
    
//   })
// console.log(i.fragments.length);

  //   i.format().map((a) => {
  //     console.log(a);

  //     // console.log(a.selector);
  //     console.log();

  //   })

  const selector = tx!.data.substring(0, 10);

  const frag = i.getFunction(selector);
//   console.log(frag);

  //   console.log(JSON.stringify(i.fragments,null,2));

  //   i.fragments.map((item: any) => {
  //     const hashedSelector = getSeletorByAbi(item);
  //     console.log(hashedSelector);

  //     if (selector == hashedSelector) {
  //       selectorAbi.push(item);
  //     }
  //   });

  i.forEachFunction((item,i) => {
    // console.log(item.selector);
    // console.log(selector);

    if (selector == item.selector) {
      selectorAbi.push(abi[i]);
    }
  });

  //   console.log(JSON.stringify(selectorAbi,null,2));
  // console.log(JSON.stringify([selectorAbi[3]],null,2));

  const ii = new ethers.Interface(selectorAbi);
  const _frag = ii.getFunction(selector);


//   console.log(JSON.stringify(_frag?.inputs,null,2));
  
  const decodeCalldata = ii.decodeFunctionData(selector, tx!.data);
  console.log(decodeCalldata);
  
  // const diq = fuck(_frag!.inputs,decodeCalldata)
  // console.log(diq);
//   console.log(JSON.stringify(diq,null,2));
  
  return

  
//   if (!frag) {
//     return;
//   }

console.log([selectorAbi[0].inputs]);

  const keys = processParam(selectorAbi[0].inputs);
  console.log(keys);
  
  const values = processArgs(keys, decodeCalldata);
  console.log(values);
  

//   const result = {
//     function: frag!.name,
//     params: { ...values },
//   };

// //   console.log(result.params);
//   console.log(JSON.stringify(result.params,null,2));
  

  return;
  //   const mappedResult = abi[0].inputs.reduce((acc: any, input: any, index: any) => {
  //     acc[input.name!] = decodeCalldata[index];
  //     return acc;
  //   }, {} as any);

  //   console.log(mappedResult);
}

void main();
