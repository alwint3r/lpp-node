import { AccelerometerDecoder } from "../decoders/accelerometer.decoder";

test('Decode accelerometer data', () => {
  const decoder = new AccelerometerDecoder();
  const data = Buffer.from('067104D2FB2E0000', 'hex');
  const result = decoder.decode(data);

  expect(decoder.getSize()).toBe(6);

  expect(result.channel).toBe(6);
  expect(result.type).toBe(113);
  expect(result.data).toStrictEqual({
    x: 1.234,
    y: -1.234,
    z: 0,
  });
  expect(result.label).toBe('Accelerometer');
});
