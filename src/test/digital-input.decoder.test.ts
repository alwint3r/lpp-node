import { DigitalInputDecoder } from "../decoders/digital-input.decoder";

test('decode digital input', () => {
  const decoder = new DigitalInputDecoder();
  const data = Buffer.from('000001', 'hex');
  const result = decoder.decode(data);

  expect(decoder.getSize()).toBe(1);

  expect(result).toEqual({
    label: 'Digital Input',
    data: 1,
    type: 0,
    channel: 0,
  });
});

test('decode digital input with different channel and data', () => {
  const decoder = new DigitalInputDecoder();
  const data2 = Buffer.from('010010', 'hex');
  const result2 = decoder.decode(data2);
  
  expect(result2).toEqual({
    label: 'Digital Input',
    data: 16,
    type: 0,
    channel: 1,
  });
})

