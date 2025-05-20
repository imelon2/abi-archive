### Example generate .sol file

```typescript
const openzeppelinV4 = path.join(cwd, `node_modules/@openzeppelin/contracts-v4/**/**/${solFile}`);
const openzeppelinV5 = path.join(cwd, `node_modules/@openzeppelin/contracts-v5/**/**/${solFile}`);
const allFiles = await glob([openzeppelinV4,openzeppelinV5]);
const compiled = solcCompile(allFiles);

const contracts = compiled.contracts;
seperateBySolc(contracts);
```

### Example generate .json file

```typescript
  const cwd = process.cwd();
  const openzeppelinV4 = path.join(cwd, `node_modules/@openzeppelin/contracts-v4/build/contracts/${abiFile}`);
  const openzeppelinV5 = path.join(cwd, `node_modules/@openzeppelin/contracts-v5/build/contracts/${abiFile}`);
  const allFiles = await glob([openzeppelinV4, openzeppelinV5]);

  seperateByJson(allFiles);
```