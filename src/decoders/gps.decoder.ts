import { buffer } from "stream/consumers";
import { BaseDataDecoder } from "./base";

export type GpsLocation = {
  latitude: number;
  longitude: number;
  altitude: number;
};

export class GpsDecoder extends BaseDataDecoder<GpsLocation> {
  getSize() {
    return 9;
  }

  getType() {
    return 136;
  }

  parseLocationData(data: Buffer): number {
    if (data.length < 3) {
      return NaN;
    }

    if (data[0] & 0x80) {
      return Buffer.concat([Buffer.from([0xff]), data]).readInt32BE(0);
    }

    return (data[0] << 16) | (data[1] << 8) | data[2];
  }

  decode(data: Buffer) {
    const channel = data.readUInt8(0);
    const latitude = this.parseLocationData(data.slice(2, 5)) / 10000;
    const longitude = this.parseLocationData(data.slice(5, 8)) / 10000;
    const altitude = this.parseLocationData(data.slice(8, 11)) / 100;

    return {
      channel,
      data: {
        latitude,
        longitude,
        altitude,
      },
      type: this.getType(),
      label: "GPS",
    };
  }
}
