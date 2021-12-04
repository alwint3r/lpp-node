import { AccelerometerDecoder } from "./decoders/accelerometer.decoder";
import { AnalogInputDecoder } from "./decoders/analog-input.decoder";
import { BarometerDecoder } from "./decoders/barometer.decoder";
import { DataDecoder, DecoderMap, DecoderOutput } from "./decoders/base";
import { DigitalInputDecoder } from "./decoders/digital-input.decoder";
import { DigitalOutputDecoder } from "./decoders/digital-output.decoder";
import { GyroscopeDecoder } from "./decoders/gyroscope.decoder";
import { IlluminanceSensorDecoder } from "./decoders/illuminance-sensor.decoder";
import { PresenceSensorDecoder } from "./decoders/presence-sensor.decoder";
import { RelativeHumidityDecoder } from "./decoders/relative-humidity.decoder";
import { TemperatureSensorDecoder } from "./decoders/temperature-sensor.decoder";

export class LPPDecoder {
  private builtInDecoders: DataDecoder<unknown>[];
  private extendedDecoders: DecoderMap;

  constructor() {
    this.builtInDecoders = [
      new DigitalInputDecoder(),
      new DigitalOutputDecoder(),
      new AnalogInputDecoder(),
      new IlluminanceSensorDecoder(),
      new PresenceSensorDecoder(),
      new TemperatureSensorDecoder(),
      new RelativeHumidityDecoder(),
      new AccelerometerDecoder(),
      new BarometerDecoder(),
      new GyroscopeDecoder(),
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
