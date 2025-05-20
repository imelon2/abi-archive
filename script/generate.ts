
import { genArbitrum } from '../src/projects/arbitrum';
import { genOpenzeppelin } from '../src/projects/openzeppelin';

async function main() {
    await genOpenzeppelin()
    await genArbitrum()
}


void main();
