import { BaseDataDecoder, DecoderOutput } from "./base";

export class TemperatureSensorDecoder extends BaseDataDecoder {
  getType() {
    return 103;
  }

  getSize() {
    return 2;
  }

  decode(data: Buffer): DecoderOutput<number> {
    const channel = data.readUInt8(0);
    const value = data.readInt16BE(2);

    return {
      channel,
      data: value / 10,
      label: "Temperature Sensor",
      type: this.getType(),
    };
  }
}
