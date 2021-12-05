import { BaseDataDecoder, DecoderOutput } from "./base";

export class DigitalInputDecoder extends BaseDataDecoder<number> {
  getSize(): number {
    return 1;
  }

  getType(): number {
    return 0;
  }

  decode(data: Buffer): DecoderOutput<number> {
    const channel = data[0];
    const value = data[2];
    return {
      label: "Digital Input",
      channel,
      type: this.getType(),
      data: value,
    };
  }
}
