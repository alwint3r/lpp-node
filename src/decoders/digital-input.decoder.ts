import { DataDecoder, DecoderOutput } from "./base";

export class DigitalInputDecoder implements DataDecoder<number> {
  isValid(data: Buffer): boolean {
    if (data.length < 3) {
      return false;
    }

    if (data[1] === this.getType()) {
      return true;
    }

    return true;
  }

  getSize(): number {
    return 2;
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
