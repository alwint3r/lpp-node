import { BaseDataDecoder, DecoderOutput } from "./base";

export class PresenceSensorDecoder extends BaseDataDecoder<number> {
  getSize() {
    return 1;
  }

  getType() {
    return 102;
  }

  decode(data: Buffer): DecoderOutput<number> {
    const channel = data.readUInt8(0);
    const value = data.readUInt8(2);
    return {
      channel,
      data: value,
      label: "Presence Sensor",
      type: this.getType(),
    };
  }
}
