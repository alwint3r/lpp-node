import { GpsDecoder } from "../decoders/gps.decoder";

test("Decode GPS location", () => {
  const decoder = new GpsDecoder();
  const data = Buffer.from("018806765ff2960a0003e8", "hex");

  const result = decoder.decode(data);

  expect(result).toEqual({
    data: {
      latitude: 42.3519,
      longitude: -87.9094,
      altitude: 10,
    },
    type: 136,
    label: "GPS",
    channel: 1,
  });
});
