import { BarometerDecoder } from "../decoders/barometer.decoder";

test("Decode barometer data", () => {
  const decoder = new BarometerDecoder();
  const data = Buffer.from("18732285", "hex");
  const result = decoder.decode(data);

  expect(result).toEqual({
    type: 73,
    channel: 24,
    data: 883.7,
    label: "Barometer",
  });
});
