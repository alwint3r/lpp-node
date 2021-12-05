import { BaseDataDecoder, DecoderOutput } from "./base";

export class DigitalOutputDecoder extends BaseDataDecoder<number> {
  decode(data: Buffer): DecoderOutput<number> {
    const channel = data.readUInt8(0);
    const value = data.readUInt8(2);

    return {
      channel,
      data: value,
      type: this.getType(),
      label: "Digital Output",
    };
  }

  getSize(): number {
    return 1;
  }

  getType(): number {
    return 1;
  }
}
