import { TemperatureSensorDecoder } from "../decoders/temperature-sensor.decoder";

test('Decode temperature sensor', () => {
  const decoder = new TemperatureSensorDecoder();
  const data = Buffer.from('03670110', 'hex');
  const result = decoder.decode(data);

  expect(decoder.getSize()).toBe(2);

  expect(result).toEqual({
    label: 'Temperature Sensor',
    data: 27.2,
    type: 103,
    channel: 3,
  });
});