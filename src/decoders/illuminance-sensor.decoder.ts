import { BaseDataDecoder, DecoderOutput } from "./base";

export class IlluminanceSensorDecoder extends BaseDataDecoder<number> {
  decode(data: Buffer): DecoderOutput<number> {
    const channel = data.readUInt8(0);
    const value = data.readUInt16BE(2);

    return {
      channel,
      data: value,
      type: this.getType(),
      label: "Illuminance Sensor",
    };
  }

  getSize(): number {
    return 2;
  }

  getType(): number {
    return 101;
  }
}