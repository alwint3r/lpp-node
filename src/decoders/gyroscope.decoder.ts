import { BaseDataDecoder } from "./base";

export type GyroscopeAxis = {
  x: number;
  y: number;
  z: number;
};

export class GyroscopeDecoder extends BaseDataDecoder<GyroscopeAxis> {
  getType() {
    return 134;
  }

  getSize() {
    return 6;
  }

  decode(data: Buffer) {
    const channel = data.readUInt8(0);
    const x = data.readInt16BE(2) / 100;
    const y = data.readInt16BE(4) / 100;
    const z = data.readInt16BE(6) / 100;

    return {
      channel,
      data: {
        x,
        y,
        z,
      },
      label: "Gyroscope",
      type: this.getType(),
    };
  }
}
