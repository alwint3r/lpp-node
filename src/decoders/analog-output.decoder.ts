import { BaseDataDecoder, DecoderOutput } from "./base";

export class AnalogOutputDecoder extends BaseDataDecoder {
  decode(data: Buffer): DecoderOutput<number> {
    const channel = data.readUInt8(0);
    const value = data.readInt16BE(2);

    return {
      label: "Analog Output",
      channel,
      type: this.getType(),
      data: value / 100.0,
    }
  }

  getSize(): number {
    return 2;
  }

  getType(): number {
    return 3;
  }
}