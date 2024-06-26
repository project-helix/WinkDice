import { List } from './list';
export declare function listOf<T>(...args: T[]): List<T>;
export declare function listFrom<T>(value?: Iterable<T>): List<T>;
