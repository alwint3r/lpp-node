import { DataDecoder, DecoderOutput } from "../decoders/base";
import { GpsLocation } from "../decoders/gps.decoder";
import { LPPDecoder } from "../lpp";

test("lpp decoder decode digital input and output message", () => {
  const lpp = new LPPDecoder();
  const data = Buffer.from("000010010110", "hex");
  const result = lpp.decode(data);

  expect(result.length).toBe(2);
  expect(result).toContainEqual({
    label: "Digital Input",
    data: 16,
    channel: 0,
    type: 0,
  });
  expect(result).toContainEqual({
    label: "Digital Output",
    data: 16,
    channel: 1,
    type: 1,
  });
});

test("lpp decoder decode digital in/out and analog in", () => {
  const lpp = new LPPDecoder();
  const data = Buffer.from("0000100101101002014a", "hex");
  const result = lpp.decode(data);

  expect(result.length).toBe(3);
  expect(result).toContainEqual({
    label: "Digital Input",
    data: 16,
    channel: 0,
    type: 0,
  });
  expect(result).toContainEqual({
    label: "Digital Output",
    data: 16,
    channel: 1,
    type: 1,
  });
  expect(result).toContainEqual({
    label: "Analog Input",
    data: 3.3,
    channel: 16,
    type: 2,
  });
});

test("lpp decoder decode digital in/out, analog in, and illuminance sensor", () => {
  const lpp = new LPPDecoder();
  const data = Buffer.from("0000100101101002014a0a650840", "hex");
  const result = lpp.decode(data);

  expect(result.length).toBe(4);
  expect(result).toContainEqual({
    label: "Digital Input",
    data: 16,
    channel: 0,
    type: 0,
  });
  expect(result).toContainEqual({
    label: "Digital Output",
    data: 16,
    channel: 1,
    type: 1,
  });
  expect(result).toContainEqual({
    label: "Analog Input",
    data: 3.3,
    channel: 16,
    type: 2,
  });
  expect(result).toContainEqual({
    label: "Illuminance Sensor",
    data: 2112,
    type: 101,
    channel: 10,
  });
});

test("lpp decoder decode multiple temperature sensor", () => {
  const lpp = new LPPDecoder();
  const data = Buffer.from("03670110056700FF", "hex");
  const result = lpp.decode(data);

  expect(result.length).toBe(2);
  expect(result).toContainEqual({
    label: "Temperature Sensor",
    data: 27.2,
    channel: 3,
    type: 103,
  });
  expect(result).toContainEqual({
    label: "Temperature Sensor",
    data: 25.5,
    channel: 5,
    type: 103,
  });
});

test("custom lpp decoder for non-standard GPS precision", () => {
  const lpp = new LPPDecoder();

  type GpsNoAltitude = Omit<GpsLocation, "altitude">;
  class NonStdGpsDecoder implements DataDecoder<GpsNoAltitude> {
    decode(data: Buffer) {
      const channel = data.readUInt8(0);
      const latitude = data.readInt32BE(2) / 1e7;
      const longitude = data.readInt32BE(6) / 1e7;

      return {
        label: "GPS Non Standard",
        channel: channel,
        data: {
          latitude,
          longitude,
        },
        type: this.getType(),
      };
    }
    isValid(data: Buffer): boolean {
      if (data.length < this.getSize()) {
        return false;
      }

      if (data[1] !== this.getType()) {
        return false;
      }

      return true;
    }
    getSize(): number {
      return 10;
    }
    getType(): number {
      return 150;
    }
  }

  lpp.addNewDecoder(new NonStdGpsDecoder());

  const data = Buffer.from("0d96ff6921e43bf7eb8f", "hex");
  const result = lpp.decode(data);

  const gps: DecoderOutput<GpsLocation> = result[0] as DecoderOutput<GpsLocation>;

  expect(result.length).toBe(1);
  expect(gps.channel).toBe(13);
  expect(gps.label).toBe("GPS Non Standard");
  expect(gps.data.latitude).toBeCloseTo(-0.988726, 5);
  expect(gps.data.longitude).toBeCloseTo(100.610346, 5);
  expect(gps.type).toBe(150);
});
