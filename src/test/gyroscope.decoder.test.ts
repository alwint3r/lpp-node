import { GyroscopeDecoder } from "../decoders/gyroscope.decoder";

test("Decode gyroscope data", () => {
  const data = Buffer.from("2086007b01c80315", "hex");
  const decoder = new GyroscopeDecoder();
  const result = decoder.decode(data);

  expect(decoder.getSize()).toBe(6);

  expect(result).toEqual({
    label: "Gyroscope",
    data: {
      x: 1.23,
      y: 4.56,
      z: 7.89,
    },
    channel: 32,
    type: 134,
  });
});
