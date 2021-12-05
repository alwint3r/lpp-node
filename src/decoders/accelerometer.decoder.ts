import { BaseDataDecoder } from "./base";

export type AccelerometerAxis = {
  x: number;
  y: number;
  z: number;
};

export class AccelerometerDecoder extends BaseDataDecoder<AccelerometerAxis> {
  getType() {
    return 113;
  }

  getSize() {
    return 6;
  }

  decode(data: Buffer) {
    const x = data.readInt16BE(2) / 1000;
    const y = data.readInt16BE(4) / 1000;
    const z = data.readInt16BE(6) / 1000;
    const channel = data.readUInt8(0);

    return {
      channel,
      label: "Accelerometer",
      data: {
        x,
        y,
        z,
      },
      type: this.getType(),
    };
  }
}
