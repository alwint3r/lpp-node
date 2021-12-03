import { DataDecoder, DecoderOutput } from "./base";

export class DigitalOutputDecoder implements DataDecoder<number> {
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

  isValid(data: Buffer): boolean {
    if (data.length < this.getSize() + 2) {
      return false;
    }

    if (data.readUInt8(1) !== this.getType()) {
      return false;
    }

    return true;
  }

  getSize(): number {
    return 1;
  }

  getType(): number {
    return 1;
  }
}
