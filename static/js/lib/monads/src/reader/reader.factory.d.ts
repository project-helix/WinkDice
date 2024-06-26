import { IReader } from './reader.interface';
export declare function reader<TConfig, TOut>(fn: (config: TConfig) => TOut): IReader<TConfig, TOut>;
