import { BaseDataDecoder, DecoderOutput } from "./base";

export class BarometerDecoder extends BaseDataDecoder<number> {
  getType() {
    return 115;
  }

  getSize() {
    return 2;
  }

  decode(data: Buffer): DecoderOutput<number> {
    const channel = data.readUInt8(0);
    const value = data.readUInt16BE(2) / 10;

    return {
      channel,
      data: value,
      label: "Barometer",
      type: this.getType(),
    };
  }
}
