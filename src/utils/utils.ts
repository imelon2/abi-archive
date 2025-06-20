import { ethers, id } from 'ethers';

export const strip0x = (hex: string) => {
  return hex.startsWith('0x') ? hex.slice(2) : hex;
};

export const getSeletorByAbi = (item: any) => {
  const types = item.inputs.map((i: any) => i.type).join(',');
  const signature = `${item.name}(${types})`; // name([types...])
  const selector = id(signature).slice(0, 10); // 0x + 4 bytes
  return selector;
};

export function processParam(input: readonly ethers.ParamType[], resultObject: any = {}) {
  input.forEach((paramType, i) => {
    resultObject[`${paramType.name || `__${i}__`}(${paramType.type})`] = Array.isArray(paramType.components) ? processParam(paramType.components) : null;
  });

  return resultObject;
}

export function processArgs(object: any, decodeCalldata: ethers.Result) {
  Object.keys(object).forEach((val, i) => {
    // @Fixed match with Result`s index
    const arg = decodeCalldata[i];

    object[val] = object[val] !== null ? processArgs(object[val], arg) : typeof arg === 'bigint' ? arg.toString() : arg;
  });

  return object;
}

export function fuck(input: readonly ethers.ParamType[], decodeCalldata: ethers.Result, resultObject: any = {}) {
  decodeCalldata.forEach((val, i) => {
    const paramType = input[i];
    const key = `${input[i].name || `__${i}__`}(${paramType.type})`
    if(paramType.isArray()) {
      // resultObject[key] = fuck([paramType.arrayChildren],val as ethers.Result)
      resultObject[key] = (val as ethers.Result).map(arrayVal => fuck([paramType.arrayChildren],[arrayVal] as ethers.Result))
    } else if(paramType.isTuple()) {
      resultObject[key] = fuck(paramType.components,val)
    } else {
      resultObject[`${input[i].name || `__${i}__`}(${paramType.type})`] = replacer(val);
    }
  });

  return resultObject
}

function replacer( value: any) {
  // BigInt는 문자열로 변환
  return typeof value === 'bigint'
    ? value.toString()
    : value;
}