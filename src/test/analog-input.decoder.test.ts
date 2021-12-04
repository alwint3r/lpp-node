import { AnalogInputDecoder } from "../decoders/analog-input.decoder";


test('Decode analog input', () => {
  const data = Buffer.from('1002014a','hex');
  const decoder = new AnalogInputDecoder();

  expect(decoder.getSize()).toBe(2);

  const result = decoder.decode(data);

  expect(result.label).toBe("Analog Input");
  expect(result.data).toBe(3.3);
  expect(result.channel).toBe(16);
  expect(result.type).toBe(2);
});