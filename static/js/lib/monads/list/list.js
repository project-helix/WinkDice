/* eslint-disable @typescript-eslint/no-explicit-any */
// Repurposed from this great piece of code: https://gist.github.com/gvergnaud/6e9de8e06ef65e65f18dbd05523c7ca9
// Implements a number of functions from the .NET LINQ library: https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.reverse?view=netcore-3.1
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * A lazily evaluated list with useful extension methods.
 */
var List = /** @class */ (function () {
    function List(generator, length) {
        this.length = length;
        this[Symbol.iterator] = generator;
    }
    List.prototype.generator = function () {
        return this[Symbol.iterator]();
    };
    List.flattenArgs = function (args) {
        return args
            .reduce(function (acc, curr) {
            return Array.isArray(curr)
                ? __spreadArray(__spreadArray([], __read(acc), false), __read(curr), false) : __spreadArray(__spreadArray([], __read(acc), false), [curr], false);
        }, []);
    };
    List.of = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new List(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [5 /*yield**/, __values(args)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }, args.length);
    };
    List.from = function (iterable) {
        return iterable
            ? new List(function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [5 /*yield**/, __values(iterable)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }, iterable.length)
            : List.empty();
    };
    List.range = function (start, end, step) {
        if (step === void 0) { step = 1; }
        return new List(function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = start;
                        _a.label = 1;
                    case 1:
                        if (!(i <= end)) return [3 /*break*/, 3];
                        return [4 /*yield*/, i];
                    case 2:
                        _a.sent();
                        i += step;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        }, Math.floor((end - start + 1) / step));
    };
    List.integers = function () {
        return this.range(0, Infinity);
    };
    List.empty = function () {
        return new List(function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }, 0);
    };
    List.prototype.map = function (fn) {
        var generator = this.generator();
        return new List(function () {
            var generator_1, generator_1_1, value, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        generator_1 = __values(generator), generator_1_1 = generator_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!generator_1_1.done) return [3 /*break*/, 4];
                        value = generator_1_1.value;
                        return [4 /*yield*/, fn(value)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        generator_1_1 = generator_1.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (generator_1_1 && !generator_1_1.done && (_a = generator_1.return)) _a.call(generator_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }, this.length);
    };
    /**
     * Delete the first N elements from a list.
     * @param count
     */
    List.prototype.drop = function (count) {
        var generator = this.generator();
        return new List(function () {
            var next, n;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        next = generator.next();
                        n = 1;
                        _a.label = 1;
                    case 1:
                        if (!!next.done) return [3 /*break*/, 4];
                        if (!(n > count)) return [3 /*break*/, 3];
                        return [4 /*yield*/, next.value];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        n++;
                        next = generator.next();
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }, this.length - count);
    };
    /**
     * Deletes the first element from a list.
     * @param count
     */
    List.prototype.tail = function () {
        return this.drop(1);
    };
    List.prototype.scan = function (fn, seed) {
        var generator = this.generator();
        return new List(function () {
            var acc, generator_2, generator_2_1, value, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        acc = seed;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        generator_2 = __values(generator), generator_2_1 = generator_2.next();
                        _b.label = 2;
                    case 2:
                        if (!!generator_2_1.done) return [3 /*break*/, 5];
                        value = generator_2_1.value;
                        return [4 /*yield*/, acc = fn(acc, value)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        generator_2_1 = generator_2.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (generator_2_1 && !generator_2_1.done && (_a = generator_2.return)) _a.call(generator_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }, this.length);
    };
    List.prototype.reduce = function (fn, seed) {
        return this.toArray().reduce(fn, seed);
    };
    /**
     * Filters a sequence of values based on a predicate.
     * @param fn A function to test each element for a condition.
     */
    List.prototype.filter = function (fn) {
        var generator = this.generator();
        return new List(function () {
            var generator_3, generator_3_1, value, e_3_1;
            var e_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        generator_3 = __values(generator), generator_3_1 = generator_3.next();
                        _b.label = 1;
                    case 1:
                        if (!!generator_3_1.done) return [3 /*break*/, 4];
                        value = generator_3_1.value;
                        if (!fn(value)) return [3 /*break*/, 3];
                        return [4 /*yield*/, value];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        generator_3_1 = generator_3.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (generator_3_1 && !generator_3_1.done && (_a = generator_3.return)) _a.call(generator_3);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }, this.length);
    };
    /**
     * Filters a sequence of values based on a predicate. Alias to filter
     * @param fn A function to test each element for a condition.
     */
    List.prototype.where = function (fn) {
        return this.filter(fn);
    };
    List.prototype.concat = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var generator = this.generator();
        var toAdd = List.flattenArgs(args);
        return new List(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [5 /*yield**/, __values(generator)];
                    case 1:
                        _a.sent();
                        return [5 /*yield**/, __values(toAdd)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }, this.length + toAdd.length);
    };
    /**
     * Make a new list containing just the first N elements from an existing list.
     * @param count The number of elements to return.
     */
    List.prototype.take = function (count) {
        var generator = this.generator();
        return new List(function () {
            var next, n;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        next = generator.next();
                        n = 0;
                        _a.label = 1;
                    case 1:
                        if (!(!next.done && count > n)) return [3 /*break*/, 3];
                        return [4 /*yield*/, next.value];
                    case 2:
                        _a.sent();
                        n++;
                        next = generator.next();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        }, this.length > count ? count : this.length);
    };
    /**
     * Determines whether all elements of a sequence satisfy a condition.
     */
    List.prototype.all = function (fn) {
        var generator = this.generator();
        var newList = new List(function () {
            var _a, _b, value, e_4_1;
            var e_4, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, 8, 9]);
                        _a = __values(generator), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 6];
                        value = _b.value;
                        if (!fn(value)) return [3 /*break*/, 3];
                        return [4 /*yield*/, value];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, value];
                    case 4: return [2 /*return*/, _d.sent()];
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_4_1 = _d.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        }, this.length);
        return newList.toArray().length === this.length;
    };
    /**
     * Determines whether a sequence contains any elements matching the predicate.
     * @param fn A function to test each element for a condition.
     */
    List.prototype.any = function (fn) {
        var generator = this.generator();
        var newList = new List(function () {
            var _a, _b, value, e_5_1;
            var e_5, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(generator), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        value = _b.value;
                        if (!fn(value)) return [3 /*break*/, 3];
                        return [4 /*yield*/, value];
                    case 2: return [2 /*return*/, _d.sent()];
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_5_1 = _d.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }, this.length);
        return newList.toArray().length >= 1;
    };
    /**
     * Determines whether a sequence contains any elements matching the predicate.
     * @param fn A function to test each element for a condition.
     * Aliased to any()
     */
    List.prototype.some = function (fn) {
        return this.any(fn);
    };
    /**
     * Filters the elements of the list based on a specified type.
     * @param type The type to filter the elements of the sequence on.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    List.prototype.ofType = function (type) {
        return this.filter(function (a) { return a instanceof type; });
    };
    List.prototype.toDictionary = function (key) {
        return this.reduce(function (acc, curr, idx) {
            var _a, _b;
            return key
                ? curr[key]
                    ? __assign(__assign({}, acc), (_a = {}, _a[curr[key]] = curr, _a)) : acc
                : __assign(__assign({}, acc), (_b = {}, _b[idx] = curr, _b));
        }, {});
    };
    // /**
    //  * Sorts the elements of a sequence in ascending order.
    //  */
    // public orderBy<K extends keyof T>(prop?: T extends object ? K : never): List<T> {
    //   throw Error('Not Implemented')
    // }
    // public orderByDescending(): List<T> {
    //   throw Error('Not Implemented')
    // }
    /**
     * Inverts the order of the elements in a sequence.
     */
    // reverse(): List<T> {
    //   throw new Error('Not Implemented')
    // }
    List.prototype.sum = function () {
        return this
            .toArray()
            .reduce(function (acc, curr) {
            return typeof curr === 'number'
                ? acc + curr
                : 0;
        }, 0);
    };
    /**
     * Gets the first item in the collection or returns the provided value when undefined
     */
    List.prototype.headOr = function (valueWhenUndefined) {
        return this.headOrUndefined() || valueWhenUndefined;
    };
    /**
     * Gets the first item in the collection or returns undefined
     */
    List.prototype.headOrUndefined = function () {
        return this.generator().next().value;
    };
    /**
     * Gets the first item in the collection or returns a computed function
     */
    List.prototype.headOrCompute = function (fn) {
        return this.headOrUndefined() || fn();
    };
    /**
     * Gets the first item in the collection or throws an error if undefined
     */
    List.prototype.headOrThrow = function (msg) {
        return this.headOrUndefined() || (function () { throw new Error(msg); })();
    };
    /** Convert to standard array */
    List.prototype.toArray = function () {
        return __spreadArray([], __read(this), false);
    };
    /** Convert to standard array. Aliased to toArray() */
    List.prototype.toIterable = function () {
        return this.toArray();
    };
    return List;
}());
export { List };
//# sourceMappingURL=list.js.map