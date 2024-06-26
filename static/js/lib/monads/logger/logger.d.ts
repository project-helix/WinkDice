import { IMonad } from '../monad/monad.interface';
/**
 * @name Logger
 * @class Perform calculation while collecting logs
 */
export declare class Logger<TLogs, TValue> implements IMonad<TValue> {
    private readonly logs;
    private readonly value;
    /**
     * @description Construct a Logger object.
     * @constructor
     * @param {TLogs[]} logs The collection of logs.
     * @param {TValue} value The value to wrap.
     */
    constructor(logs: TLogs[], value: TValue);
    /**
     * @name Logger
     * @description Helper function to build a Logger object.
     * @static
     * @param {TLogs[]} story The collection of logs.
     * @param {TValue} value The value to wrap.
     * @returns {Logger<TLogs, TValue>} A Logger object containing the collection of logs and value.
     */
    static logger<TLogs, TValue>(logs: TLogs[], value: TValue): Logger<TLogs, TValue>;
    static tell<TLogs>(s: TLogs): Logger<TLogs, number>;
    static startWith<TLogs, TValue>(s: TLogs, value: TValue): Logger<TLogs, TValue>;
    of<TValue>(v: TValue): Logger<TLogs, TValue>;
    flatMap<TValueB>(fn: (value: TValue) => Logger<TLogs, TValueB>): Logger<TLogs, TValueB>;
    flatMapPair<TValueB>(fn: (value: TValue) => [TLogs, TValueB]): Logger<TLogs, TValueB>;
    runUsing<TOutput>(fn: (opts: {
        logs: TLogs[];
        value: TValue;
    }) => TOutput): TOutput;
}
