export type DecoderOutput<T> = {
  label: string;
  channel: number;
  type: number;
  data: T;
};

export type DecoderMap = Record<number, DataDecoder>;

export interface DataDecoder<T = number> {
  decode(data: Buffer): DecoderOutput<T>;
  isValid(data: Buffer): boolean;
  getSize(): number;
  getType(): number;
}
