import { LPPDecoder } from "../lpp";

test("lpp decoder decode digital input and output message", () => {
  const lpp = new LPPDecoder();
  const data = Buffer.from("000010010110", "hex");
  const result = lpp.decode(data);

  expect(result.length).toBe(2);
  expect(result).toContainEqual({
    label: "Digital Input",
    data: 16,
    channel: 0,
    type: 0,
  });
  expect(result).toContainEqual({
    label: "Digital Output",
    data: 16,
    channel: 1,
    type: 1,
  });
});

test("lpp decoder decode digital in/out and analog in", () => {
  const lpp = new LPPDecoder();
  const data = Buffer.from("0000100101101002014a", "hex");
  const result = lpp.decode(data);

  expect(result.length).toBe(3);
  expect(result).toContainEqual({
    label: "Digital Input",
    data: 16,
    channel: 0,
    type: 0,
  });
  expect(result).toContainEqual({
    label: "Digital Output",
    data: 16,
    channel: 1,
    type: 1,
  });
  expect(result).toContainEqual({
    label: "Analog Input",
    data: 3.3,
    channel: 16,
    type: 2,
  });
});

test("lpp decoder decode digital in/out, analog in, and illuminance sensor", () => {
  const lpp = new LPPDecoder();
  const data = Buffer.from("0000100101101002014a0a650840", "hex");
  const result = lpp.decode(data);

  expect(result.length).toBe(4);
  expect(result).toContainEqual({
    label: "Digital Input",
    data: 16,
    channel: 0,
    type: 0,
  });
  expect(result).toContainEqual({
    label: "Digital Output",
    data: 16,
    channel: 1,
    type: 1,
  });
  expect(result).toContainEqual({
    label: "Analog Input",
    data: 3.3,
    channel: 16,
    type: 2,
  });
  expect(result).toContainEqual({
    label: "Illuminance Sensor",
    data: 2112,
    type: 101,
    channel: 10,
  });
});


test("lpp decoder decode multiple temperature sensor", () => {
  const lpp = new LPPDecoder();
  const data = Buffer.from("03670110056700FF", "hex");
  const result = lpp.decode(data);

  expect(result.length).toBe(2);
  expect(result).toContainEqual({
    label: "Temperature Sensor",
    data: 27.2,
    channel: 3,
    type: 103,
  });
  expect(result).toContainEqual({
    label: "Temperature Sensor",
    data: 25.5,
    channel: 5,
    type: 103,
  });
});
