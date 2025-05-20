import fs from 'fs';
import solc from 'solc';
import { id } from 'ethers';
import { errorPath, eventPath, functionPath } from './constant';
import { strip0x } from './utils';


export const solcCompile = (globedSolPath: string[]) => {
    let sources: any = {};
  
    globedSolPath.map((sol) => {
      const code = fs.readFileSync(sol, 'utf8');
      sources[sol] = {
        content: code,
      };
    });
  
    const input = {
      language: 'Solidity',
      sources,
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi'],
          },
        },
      },
    };
    return JSON.parse(solc.compile(JSON.stringify(input)));
  };
  
  export const seperateBySolc = (contracts: any) => {
    Object.keys(contracts).map((contractPath) => {
      Object.keys(contracts[contractPath]).map((contractName) => {
        const { abi } = contracts[contractPath][contractName];
        seperateAbi(abi);
      });
    });
  };
  
  export const seperateByJson = (abiPaths: string[]) => {
    abiPaths.map((abiPath) => {
      const { abi } = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
      seperateAbi(abi);
    });
  };
  
const seperateAbi = (abi: any[]) => {
    for (const item of abi) {
      if (item.type === 'function') {
        const types = item.inputs.map((i: any) => i.type).join(',');
        const signature = `${item.name}(${types})`; // name([types...])
        const selector = id(signature).slice(0, 10); // 0x + 4 bytes
  
        save(selector, item, functionPath);
      } else if (item.type === 'error') {
        const types = item.inputs.map((i: any) => i.type).join(',');
        const signature = `${item.name}(${types})`; // name([types...])
        const selector = id(signature).slice(0, 10); // 0x + 4 bytes
  
        save(selector, item, errorPath);
      } else if (item.type === 'event') {
        const types = item.inputs.map((i: any) => i.type).join(',');
        const signature = `${item.name}(${types})`; // name([types...])
        const topic = id(signature);
  
        save(topic, item, eventPath);
      }
    }
  };
  
  export const save = (selector: string, item: any, archivePath: string) => {
    // design trie-based layout directory storage
    const hexSelector = strip0x(selector);
    const index1 = hexSelector.slice(0, 2);
    const index2 = hexSelector.slice(2, 4);
    const filePath = `${archivePath}/${index1}/${index2}`;
    const filePathAbi = `${filePath}/abi.json`;
  
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
  
    if (!fs.existsSync(filePathAbi)) {
      fs.writeFileSync(filePathAbi, JSON.stringify([item], null, 2));
    } else {
      const origin = fs.readFileSync(filePathAbi, 'utf8');
      const data = JSON.parse(origin);
      const isDuplicate = data.some((existing: any) => JSON.stringify(existing) === JSON.stringify(item));
  
      if (!isDuplicate) {
        data.push(item);
        fs.writeFileSync(filePathAbi, JSON.stringify(data, null, 2));
      }
    }
  };