import * as path from "path";
import fs from "fs";
import solc from "solc";

import { glob } from "glob";
import { run } from "hardhat";
import { ethers, hexlify, id, toBeHex } from "ethers";
import { encodeErrorResult, parseAbiItem, parseAbiParameter } from "viem";
import { strip0x } from "../src/utils/utils";
import {
  errorPath,
  eventPath,
  functionPath,
  solFile,
} from "../src/utils/constant";

async function main() {
  const cwd = process.cwd();
  const openzeppelin = path.join(
    cwd,
    `node_modules/@openzeppelin/contracts/**/**/${solFile}`
  );
  const allFiles = await glob([openzeppelin]);
  const compiled = solcCompile(allFiles);

  const contracts = compiled.contracts;
  seperate(contracts);

  console.log("done.");

  //   console.log(compiled);
  //   console.log(compiled.errors[0].sourceLocation);

  // console.log(JSON.stringify(compiled.contracts['/Users/choi/Documents/me/choiRepo/abi-archive/node_modules/@openzeppelin/contracts/access/AccessControl.sol'],null,2));

  // await run("compile", {
  // sources: [solPath],
  //   });
}

const solcCompile = (globedSolPath: string[]) => {
  let sources: any = {};

  globedSolPath.map((sol) => {
    const code = fs.readFileSync(sol, "utf8");
    sources[sol] = {
      content: code,
    };
  });

  const input = {
    language: "Solidity",
    sources,
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi"],
        },
      },
    },
  };
  return JSON.parse(solc.compile(JSON.stringify(input)));
};

const seperate = (contracts: any) => {
  Object.keys(contracts).map((contractPath) => {
    Object.keys(contracts[contractPath]).map((contractName) => {
      const { abi } = contracts[contractPath][contractName];

      for (const item of abi) {
        if (item.type === "function") {
          const types = item.inputs.map((i: any) => i.type).join(",");
          const signature = `${item.name}(${types})`; // name([types...])
          const selector = id(signature).slice(0, 10); // 0x + 4 bytes

          save(selector, item, functionPath);
        } else if (item.type === "error") {
          const types = item.inputs.map((i: any) => i.type).join(",");
          const signature = `${item.name}(${types})`; // name([types...])
          const selector = id(signature).slice(0, 10); // 0x + 4 bytes

          save(selector, item, errorPath);
        } else if (item.type === "event") {
          const types = item.inputs.map((i: any) => i.type).join(",");
          const signature = `${item.name}(${types})`; // name([types...])
          const topic = id(signature);

          save(topic, item, eventPath);
        }
      }
    });
  });
};

const save = (selector: string, item: any, archivePath: string) => {
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
    const origin = fs.readFileSync(filePathAbi, "utf8");
    const data = JSON.parse(origin);
    const isDuplicate = data.some(
      (existing: any) => JSON.stringify(existing) === JSON.stringify(item)
    );

    if (!isDuplicate) {
      data.push(item);
      fs.writeFileSync(filePathAbi, JSON.stringify(data, null, 2));
    }
  }
};

void main();
