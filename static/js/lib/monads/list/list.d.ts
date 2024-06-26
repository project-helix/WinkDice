/**
 * A lazily evaluated list with useful extension methods.
 */
export declare class List<T> {
    private readonly length;
    [k: string]: any;
    constructor(generator: () => Generator<T, T[], T>, length: number);
    private generator;
    private static flattenArgs;
    static of<T>(...args: T[]): List<T>;
    static from<T>(iterable?: Iterable<T>): List<T>;
    static range(start: number, end: number, step?: number): List<number>;
    static integers(): List<number>;
    static empty<T>(): List<T>;
    map<B>(fn: (val: T) => B): List<B>;
    /**
     * Delete the first N elements from a list.
     * @param count
     */
    drop(count: number): List<T>;
    /**
     * Deletes the first element from a list.
     * @param count
     */
    tail(): List<T>;
    scan<B>(fn: (acc: B, val: B) => B, seed: B): List<B>;
    reduce<B>(fn: (previousValue: B, currentValue: T, currentIndex: number, array: T[]) => B, seed: B): B;
    /**
     * Filters a sequence of values based on a predicate.
     * @param fn A function to test each element for a condition.
     */
    filter(fn: (val: T) => boolean): List<T>;
    /**
     * Filters a sequence of values based on a predicate. Alias to filter
     * @param fn A function to test each element for a condition.
     */
    where(fn: (val: T) => boolean): List<T>;
    concat(...args: T[]): List<T>;
    concat(...iterable: Iterable<T>[]): List<T>;
    /**
     * Make a new list containing just the first N elements from an existing list.
     * @param count The number of elements to return.
     */
    take(count: number): List<T>;
    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    all(fn: (val: T) => boolean): boolean;
    /**
     * Determines whether a sequence contains any elements matching the predicate.
     * @param fn A function to test each element for a condition.
     */
    any(fn: (val: T) => boolean): boolean;
    /**
     * Determines whether a sequence contains any elements matching the predicate.
     * @param fn A function to test each element for a condition.
     * Aliased to any()
     */
    some(fn: (val: T) => boolean): boolean;
    /**
     * Filters the elements of the list based on a specified type.
     * @param type The type to filter the elements of the sequence on.
     */
    ofType(type: Function): List<T>;
    /**
     * Converts the list into an object with numbered indices mathing the array position of the item.
     */
    toDictionary(): {
        [key: number]: T;
    };
    /**
     * Converts the list into an object deriving key from the specified property.
     */
    toDictionary(key: keyof T): {
        [key: string]: T;
    };
    /**
     * Inverts the order of the elements in a sequence.
     */
    sum(): number;
    /**
     * Gets the first item in the collection or returns the provided value when undefined
     */
    headOr(valueWhenUndefined: T): T;
    /**
     * Gets the first item in the collection or returns undefined
     */
    headOrUndefined(): T | undefined;
    /**
     * Gets the first item in the collection or returns a computed function
     */
    headOrCompute(fn: () => NonNullable<T>): T;
    /**
     * Gets the first item in the collection or throws an error if undefined
     */
    headOrThrow(msg?: string): T;
    /** Convert to standard array */
    toArray(): T[];
    /** Convert to standard array. Aliased to toArray() */
    toIterable(): Iterable<T>;
}
