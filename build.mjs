import { cpSync, mkdirSync } from 'node:fs';
const source = new URL('./site/', import.meta.url);
const output = new URL('./dist/', import.meta.url);
mkdirSync(output, { recursive: true });
cpSync(source, output, { recursive: true });
console.log('Static site prepared in dist/');
