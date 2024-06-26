export type StateTupple<TState, TValue> = [TState, TValue];
export declare class StatePair<TState, TValue> {
    readonly state: TState;
    readonly value: TValue;
    constructor(state: TState, value: TValue);
}
export declare class State<TState, TValue> {
    private readonly fn;
    constructor(fn: (state: TState) => StateTupple<TState, TValue>);
    of(fn: (state: TState) => StateTupple<TState, TValue>): State<TState, TValue>;
    map<TValueB>(fn: (state: StatePair<TState, TValue>) => StateTupple<TState, TValueB>): State<TState, TValueB>;
    flatMap<TValueB>(fn: (state: StatePair<TState, TValue>) => State<TState, TValueB>): State<TState, TValueB>;
    run(config: TState): StatePair<TState, TValue>;
}
