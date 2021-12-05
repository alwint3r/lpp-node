'use strict';

const { LPPDecoder } = require('lpp-node');

const lpp = new LPPDecoder();
const data = Buffer.from("03670110", "hex");
const result = lpp.decode(data);

console.log(result);