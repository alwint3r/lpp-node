import { AnalogInputDecoder } from "./decoders/analog-input.decoder";
import { DataDecoder, DecoderMap, DecoderOutput } from "./decoders/base";
import { DigitalInputDecoder } from "./decoders/digital-input.decoder";
import { DigitalOutputDecoder } from "./decoders/digital-output.decoder";
import { IlluminanceSensorDecoder } from "./decoders/illuminance-sensor.decoder";
import { PresenceSensorDecoder } from "./decoders/presence-sensor.decoder";
import { TemperatureSensorDecoder } from "./decoders/temperature-sensor.decoder";

export class LPPDecoder {
  private builtInDecoders: DataDecoder[];
  private extendedDecoders: DecoderMap;

  constructor() {
    this.builtInDecoders = [
      new DigitalInputDecoder(),
      new DigitalOutputDecoder(),
      new AnalogInputDecoder(),
      new IlluminanceSensorDecoder(),
      new PresenceSensorDecoder(),
      new TemperatureSensorDecoder(),
    ];

    this.extendedDecoders = {};
  }

  private findDecoder(type: number): DataDecoder<unknown> | undefined {
    return this.builtInDecoders.find((decoder) => decoder.getType() === type);
  }

  decode(data: Buffer): DecoderOutput<unknown>[] {
    const result: DecoderOutput<unknown>[] = [];

    let cursor = 0;
    while (data.length - cursor >= 3) {
      const type = data.readUInt8(cursor + 1);
      const decoder = this.findDecoder(type);

      if (!decoder) {
        throw new Error(`Unknown data type: ${type}`);
      }

      const decoded = decoder.decode(data.slice(cursor));
      result.push(decoded);

      cursor += 2 + decoder.getSize();
    }

    return result;
  }
}
