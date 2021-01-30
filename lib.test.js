const assert = require('assert');
const lib = require('./lib');

async function en2Cn() {
    const input = 'hello';
    const expected = '你好';
    const response = await lib(input);
    const actual = response.translation[0];
    assert.ok(actual === expected);
}

async function cn2En() {
    const expected = 'hello';
    const input = '你好';
    const response = await lib(input);
    const actual = response.translation[0];
    assert.ok(actual === expected);
}

async function responseBody() {
    const input = 'hello';
    const response = await lib(input);
    assert.ok(response.hasOwnProperty('basic'));
    assert.ok(response.hasOwnProperty('translation'));
    assert.ok(response.hasOwnProperty('web'));
}

async function init() {
    await en2Cn();
    await cn2En();
    await responseBody();
    console.log('Good job!')
}

init();