import { PresenceSensorDecoder } from "../decoders/presence-sensor.decoder";

test('decode presence sensor', () => {
  const decoder = new PresenceSensorDecoder();
  const data = Buffer.from('0B6601', 'hex');
  const result = decoder.decode(data);

  expect(decoder.getSize()).toBe(1);

  expect(result).toEqual({
    label: 'Presence Sensor',
    data: 1,
    type: 102,
    channel: 11,
  });
});