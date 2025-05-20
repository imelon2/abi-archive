### Example generate .sol file

```typescript
const openzeppelinV5 = path.join(cwd, `node_modules/@openzeppelin/contracts-v5/**/**/${solFile}`);
const allFiles = await glob([openzeppelinV4,openzeppelinV5]);
const compiled = solcCompile(allFiles);

const contracts = compiled.contracts;
seperate(contracts);
```