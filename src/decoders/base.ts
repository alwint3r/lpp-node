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

export class BaseDataDecoder<T = number> implements DataDecoder<T> {
  decode(data: Buffer): DecoderOutput<T> {
    throw new Error("Method not implemented.");
  }

  isValid(data: Buffer): boolean {
    if (data.length < this.getSize() + 2) {
      return false;
    }

    if (data.readUInt8(1) !== this.getType()) {
      return false;
    }

    return true;
  }

  getSize(): number {
    throw new Error("Method not implemented.");
  }

  getType(): number {
    throw new Error("Method not implemented.");
  }
}
