#!/usr/bin/env node

const translate = require('./translate');

const argv = process.argv;
const argvLen = argv.length;

if (argvLen === 2) {
    console.log("请先输入要翻译的单词， 例如: t hello");
    process.exit(1);
}

const word = argv[2];

translate(word);

