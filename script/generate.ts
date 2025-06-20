
import { genAccountAbstraction } from '../projects/account-abstraction';
import { genArbitrum } from '../projects/arbitrum';
import { genOffchainLabs } from '../projects/offchainlabs';
import { genOpenzeppelin } from '../projects/openzeppelin';

async function main() {
    await genOpenzeppelin()
    await genArbitrum()
    await genOffchainLabs()
    await genAccountAbstraction()
}


void main();
