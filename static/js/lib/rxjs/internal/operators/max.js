import { reduce } from './reduce.js';
import { isFunction } from '../Observable.js';
export function max(comparer) {
    return reduce(isFunction(comparer) ? (x, y) => (comparer(x, y) > 0 ? x : y) : (x, y) => (x > y ? x : y));
}
//# sourceMappingURL=max.js.map