import { DigitalOutputDecoder } from "../decoders/digital-output.decoder";

test('decode digital output', () => {
  const decoder = new DigitalOutputDecoder();
  const data = Buffer.from('000001', 'hex');
  const result = decoder.decode(data);

  expect(result).toEqual({
    label: 'Digital Output',
    data: 1,
    type: 1,
    channel: 0,
  });
});

test('decode digital output with different channel and data', () => {
  const decoder = new DigitalOutputDecoder();
  const data2 = Buffer.from('010010', 'hex');
  const result2 = decoder.decode(data2);
  
  expect(result2).toEqual({
    label: 'Digital Output',
    data: 16,
    type: 1,
    channel: 1,
  });
})

