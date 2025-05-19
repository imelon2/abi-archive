import * as path from "path";
import fs from "fs";
import solc from "solc";

import { glob } from "glob";
import { run } from "hardhat";
import { ethers, hexlify, id, toBeHex } from "ethers";
import { encodeErrorResult, parseAbiItem, parseAbiParameter } from "viem";

const abiFile = "+([a-zA-Z0-9_]).json";
const solFile = "+([a-zA-Z0-9_-]).sol";

const strip0x = (hex: string) => {
  return hex.startsWith("0x") ? hex.slice(2) : hex;
};

const save = (selector: string, item: any) => {
  const archivePath = path.join(__dirname, `../archive`);

  console.log(selector);

  // console.log(`archivePath: ${archivePath}`);

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
    console.log("multi depth!!  " + filePathAbi);
    
    const origin = fs.readFileSync(filePathAbi, "utf8");
    const data = JSON.parse(origin)
    data.push(item)
    
    // @TODO: origin에 중복되면 저장x
    fs.writeFileSync(
      filePathAbi,
      JSON.stringify(data, null, 2)
    );
  }
};

async function main() {
  const cwd = process.cwd();
  const abiPath = path.join(cwd, `build`);

  const openzeppelin = path.join(
    cwd,
    `node_modules/@openzeppelin/contracts/**/**/${solFile}`
  );
  const allFiles = await glob([openzeppelin]);

  let sources: any = {};

  allFiles.map((sol) => {
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
  const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
  const contracts = compiled.contracts;
  Object.keys(contracts).map((contractPath) => {
    Object.keys(contracts[contractPath]).map((contractName) => {
      const { abi } = contracts[contractPath][contractName];

      for (const item of abi) {
        // if (item.type === "error" || item.type === "function") {
        if (item.type === "function") {
          const types = item.inputs.map((i: any) => i.type).join(",");
          const signature = `${item.name}(${types})`; // name([types...])
          const selector = id(signature).slice(0, 10); // 0x + 4 bytes

          console.log(`${signature} => ${selector}`);
          save(selector, item);
        }
      }
    });
  });

  // fs.writeFileSync(
  //   abiPath + "/" + c + ".json",
  //   JSON.stringify(contracts[contract][c].abi, null, 2)
  // );
  console.log("done.");

  //   console.log(compiled);
  //   console.log(compiled.errors[0].sourceLocation);

  // console.log(JSON.stringify(compiled.contracts['/Users/choi/Documents/me/choiRepo/abi-archive/node_modules/@openzeppelin/contracts/access/AccessControl.sol'],null,2));

  // await run("compile", {
  // sources: [solPath],
  //   });
}
void main();
