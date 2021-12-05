Cayenne Low Power Payload for Node.js
=====================================

Unofficial library for dealing with Cayenne LPP in Node.js

## Features

* Decode LPP

## API

### LPPDecoder

Decoder class with built-in decoders for standard types defined in the Cayenne LPP specification format.

#### LPPDecoder.decode(data: Buffer): DecoderOutput\<unknown>[]

Takes a buffer as an argument and produce an array of `DecoderOutput` which has the following structure (in case of `number` as the type of the `data`):

```js
{
    data: 24.3,
    channel: 1,
    label: "Temperature Sensor",
    type: 103
}
```

Example:
```js
const { LPPDecoder } = require(`lpp-node`);

const lpp = new LPPDecoder();
const payload = Buffer.from('018806765ff2960a0003e8', 'hex');

const decoded = lpp.decode(payload);

// decoded value:
// [ { data: {
//          latitude: 42.3519,
//          longitude: -87.9094,
//          altitude: 10
//     },
//     channel: 1,
//     label: "GPS",
//     type: 136 } ]
```

