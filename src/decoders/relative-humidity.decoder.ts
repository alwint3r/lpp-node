import { BaseDataDecoder, DecoderOutput } from "./base";

export class RelativeHumidityDecoder extends BaseDataDecoder<number> {
  getSize() {
    return 1;
  }

  getType() {
    return 104;
  }

  decode(data: Buffer): DecoderOutput<number> {
    const channel = data.readUInt8(0);
    const value = data.readUInt8(2);

    return {
      channel,
      data: value / 2,
      label: "Relative Humidity",
      type: this.getType(),
    };
  }
}
