import { IReader } from './reader.interface';
export declare class Reader<TConfig, TOut> implements IReader<TConfig, TOut> {
    private readonly fn;
    constructor(fn: (config: TConfig) => TOut);
    of(fn: (config: TConfig) => TOut): IReader<TConfig, TOut>;
    flatMap<TNewOut>(fn: (val: TOut) => IReader<TConfig, TNewOut>): IReader<TConfig, TNewOut>;
    map<TNewOut>(fn: (val: TOut) => TNewOut): IReader<TConfig, TNewOut>;
    run(config: TConfig): TOut;
}
