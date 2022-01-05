import { Encoder } from './encoder.ts';

const e = new Encoder();

console.log(e.encode(prompt("Input: ") as string));