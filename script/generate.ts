
import { genAccountAbstraction } from '../projects/account-abstraction';
import { genArbitrum } from '../projects/arbitrum';
import { genSource } from '../projects/source';
import { genOffchainLabs } from '../projects/offchainlabs';
import { genOpenzeppelin } from '../projects/openzeppelin';
import { genSmartWallet } from '../projects/smart-wallet';

async function main() {
    await genOpenzeppelin()
    await genArbitrum()
    await genOffchainLabs()
    await genAccountAbstraction()
    await genSource()
    await genSmartWallet()
}


void main();
