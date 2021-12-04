import { RelativeHumidityDecoder } from "../decoders/relative-humidity.decoder";

test('Decode relative humidity', () => {
  const decoder = new RelativeHumidityDecoder();
  const data = Buffer.from('19688a', 'hex');
  const result = decoder.decode(data);

  expect(decoder.getSize()).toBe(2);

  expect(result).toEqual({
    label: 'Relative Humidity',
    data: 69,
    type: 104,
    channel: 25,
  });
});