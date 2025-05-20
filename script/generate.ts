
import { genArbitrum } from '../projects/arbitrum';
import { genOpenzeppelin } from '../projects/openzeppelin';

async function main() {
    await genOpenzeppelin()
    await genArbitrum()
}


void main();
