import { BaseDataDecoder, DecoderOutput } from "./base";

export class AnalogInputDecoder extends BaseDataDecoder {
  decode(data: Buffer): DecoderOutput<number> {
    const channel = data.readUInt8(0);
    const value = data.readInt16BE(2);

    return {
      label: "Analog Input",
      channel,
      type: this.getType(),
      data: value / 100.0,
    }
  }

  getSize(): number {
    return 2;
  }

  getType(): number {
    return 2;
  }
}