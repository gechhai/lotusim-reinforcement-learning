import { cpSync, mkdirSync } from 'node:fs';
mkdirSync('dist', { recursive: true });
cpSync('site', 'dist', { recursive: true });
console.log('Static site prepared in dist/');
