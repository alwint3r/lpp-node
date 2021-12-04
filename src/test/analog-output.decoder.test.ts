import { AnalogOutputDecoder } from "../decoders/analog-output.decoder";


test('Decode analog output', () => {
  const data = Buffer.from('0f0301ea','hex');
  const decoder = new AnalogOutputDecoder();

  expect(decoder.getSize()).toBe(2);

  const result = decoder.decode(data);

  expect(result.label).toBe("Analog Output");
  expect(result.data).toBe(4.9);
  expect(result.channel).toBe(15);
  expect(result.type).toBe(3);
});