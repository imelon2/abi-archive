# ABI Archive
ABI Archive is a project that stores ABI files on GitHub and serves them through `githubusercontent URLs`. This allows applications to fetch the required ABI via simple HTTP requests. As a result, ABI data can be widely retrieved across different projects.

The project organizes ABI files using a **trie-based directory layout**.

```mermaid
flowchart TD
  repo[abi-archive/]:::dir
  repo --> FUNC[function/]:::dir
  repo --> EVT[event/]:::dir
  repo --> ERR[error/]:::dir
  
  FUNC -->|0xa9 - first byte| L1[a9/]:::dir
  L1 -->|0x05 - second byte| L2[05/]:::dir

  L2 --> |erc20 transafer(a9059cbb) abi| FILE[abi.json]:::file

  classDef dir fill:#eef,stroke:#6b8cff,stroke-width:1px,rx:6px,ry:6px;
  classDef file fill:#fff,stroke:#999,stroke-dasharray: 2 2,rx:6px,ry:6px;
```

- By using the first 2 bytes of the function selector as a two-level depth structure, it helps to minimize ABI collisions.
- ABI entries are also separated by **error, event, and function categories**, further reducing the chance of conflicts.
- This structure also reduces the size of response data, making ABI retrieval more efficient.

#### Use Cases & References
- [**choi.eth Labs**](https://choiethlabs.netlify.app/): EVM Transaction Analyzer, Parse Calldata/Error data

</br>

## Example
### Request HTTP
```shell
$ curl https://raw.githubusercontent.com/imelon2/abi-archive/refs/heads/main/archive/function/a9/05/abi.json
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
]

```
### Using Axios
```typescript
import axios from "axios"

const request = await axios.get("https://raw.githubusercontent.com/imelon2/abi-archive/refs/heads/main/archive/function/a9/05/abi.json")
console.log(request.data)

[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
]
```

## Installing Different Versions of a Project with NPM
```Shell
# Example @arbitrum/nitro-contracts
yarn add -D @arbitrum/nitro-contracts-1.2.1@npm:@arbitrum/nitro-contracts@1.2.1
yarn add -D @arbitrum/nitro-contracts-3.1.0@npm:@arbitrum/nitro-contracts@3.1.0

# Example @account-abstraction/contracts
yarn add -D @account-abstraction/contracts-0.6.0@npm:@account-abstraction/contracts@0.6.0
yarn add -D @account-abstraction/contracts-0.7.0@npm:@account-abstraction/contracts@0.7.0
yarn add -D @account-abstraction/contracts-0.8.0@npm:@account-abstraction/contracts@0.8.0
``` 