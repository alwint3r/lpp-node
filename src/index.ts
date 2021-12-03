'use strict';

import * as _ from 'lodash';
import * as payload from './payload';

export function decode(buffer: Buffer) {
  if (buffer.length < 3) {
    return [];
  }

  const result = [];

  let cursor = 0;
  while (cursor < buffer.length) {
    const channel = buffer[cursor++];
    const objectId = buffer[cursor++];

    if (_.isUndefined(channel) || _.isUndefined(objectId)) {
      return result;
    }

    const type = payload.OBJECT_IDS_TO_TYPES_MAP[objectId];
    if (!type) {
      return result;
    }

    let length = payload.getPayloadSizeFromObjectID(objectId);
    if (_.isUndefined(length)) {
      length = 0;
    }

    let data;
    const slice = buffer.slice(cursor, cursor + length);

    switch (type) {
      case payload.TYPES.IPSO_DIGITAL_INPUT:
      case payload.TYPES.IPSO_DIGITAL_OUTPUT:
        data = slice.readUInt8(0);
        break;
      case payload.TYPES.IPSO_ANALOG_OUTPUT:
      case payload.TYPES.IPSO_ANALOG_INPUT:
        data = slice.readInt16BE(0) / 100.0;
        break;
      case payload.TYPES.IPSO_ILLUMINANCE_SENSOR:
        data = slice.readInt16BE(0);
        break;
      case payload.TYPES.IPSO_TEMPERATURE_SENSOR:
        data = slice.readInt16BE(0) / 10.0;
        break;
      case payload.TYPES.IPSO_HUMIDITY_SENSOR:
        data = slice.readUInt8(0) / 2;
        break;
      case payload.TYPES.IPSO_ACCELEROMETER:
        data = [
          slice.readInt16BE(0) / 1000.0,
          slice.readInt16BE(2) / 1000.0,
          slice.readInt16BE(4) / 1000.0,
        ];
        break;
      case payload.TYPES.IPSO_BAROMETER:
        data = slice.readInt16BE(0) / 10.0;
        break;
      case payload.TYPES.IPSO_GYROMETER:
        data = [
          slice.readInt16BE(0) / 100.0,
          slice.readInt16BE(2) / 100.0,
          slice.readInt16BE(4) / 100.0,
        ];
        break;
      case payload.TYPES.IPSO_GPS_LOCATION:
        data = [
          payload.bufferTo3BytesSignedInteger(slice.slice(0, 3)) / 10000.0,
          payload.bufferTo3BytesSignedInteger(slice.slice(3, 6)) / 10000.0,
          payload.bufferTo3BytesSignedInteger(slice.slice(6, 9)) / 100,
        ];
        break;
    }

    cursor += length;

    result.push(payload.createPayloadObject(objectId, data, channel));
  }

  return result;
}
