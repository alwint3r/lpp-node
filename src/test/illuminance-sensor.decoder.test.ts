import { IlluminanceSensorDecoder } from "../decoders/illuminance-sensor.decoder";

test('decode illuminance sensor', () => {
  const decoder = new IlluminanceSensorDecoder();
  const data = Buffer.from('0a650840', 'hex');
  const result = decoder.decode(data);

  expect(decoder.getSize()).toBe(2);

  expect(result).toEqual({
    label: 'Illuminance Sensor',
    data: 2112,
    type: 101,
    channel: 10,
  });
});
