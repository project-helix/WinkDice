import { FailResult, OkResult } from '../result/result';
var Maybe = /** @class */ (function () {
    function Maybe(value) {
        this.value = value;
    }
    Maybe.prototype.of = function (value) {
        return new Maybe(value);
    };
    Maybe.none = function () {
        return new Maybe();
    };
    Maybe.some = function (value) {
        return new Maybe(value);
    };
    Maybe.prototype.isSome = function () {
        return !this.isNone();
    };
    Maybe.prototype.isNone = function () {
        return this.value === null || this.value === undefined;
    };
    Maybe.prototype.valueOr = function (value) {
        return this.isSome() ? this.value : value;
    };
    Maybe.prototype.valueOrUndefined = function () {
        return this.isSome() ? this.value : undefined;
    };
    Maybe.prototype.valueOrNull = function () {
        return this.isSome() ? this.value : null;
    };
    Maybe.prototype.valueOrCompute = function (fn) {
        return this.isSome() ? this.value : fn();
    };
    Maybe.prototype.valueOrThrow = function (msg) {
        return this.isNone() ? (function () { throw new Error(msg); })() : this.value;
    };
    Maybe.prototype.valueOrThrowErr = function (err) {
        return this.isNone()
            ? (function () { return err instanceof Error ? (function () { throw err; })() : (function () { throw new Error(); })(); })()
            : this.value;
    };
    Maybe.prototype.tap = function (obj) {
        this.isNone()
            ? typeof obj.none === 'function' && obj.none()
            : typeof obj.some === 'function' && obj.some(this.value);
    };
    Maybe.prototype.tapNone = function (fn) {
        (this.isNone()) && fn();
    };
    Maybe.prototype.tapSome = function (fn) {
        (this.isSome()) && fn(this.value);
    };
    Maybe.prototype.tapThru = function (val) {
        this.tap(val);
        return this;
    };
    Maybe.prototype.tapThruNone = function (fn) {
        this.tapNone(fn);
        return this;
    };
    Maybe.prototype.tapThruSome = function (fn) {
        this.tapSome(fn);
        return this;
    };
    Maybe.prototype.match = function (pattern) {
        return this.isNone()
            ? pattern.none()
            : pattern.some(this.value);
    };
    Maybe.prototype.toArray = function () {
        return this.isNone()
            ? []
            : Array.isArray(this.value)
                ? this.value
                : [this.value];
    };
    Maybe.prototype.map = function (fn) {
        return this.isSome()
            ? new Maybe(fn(this.value))
            : new Maybe();
    };
    Maybe.prototype.mapTo = function (t) {
        return this.isSome()
            ? new Maybe(t)
            : new Maybe();
    };
    Maybe.prototype.flatMap = function (fn) {
        return this.isNone() ? new Maybe() : fn(this.value);
    };
    Maybe.prototype.flatMapAuto = function (fn) {
        return this.isNone()
            ? new Maybe()
            : new Maybe(fn(this.value));
    };
    Maybe.prototype.project = function (fn) {
        return this.flatMapAuto(fn);
    };
    Maybe.prototype.filter = function (fn) {
        return this.isNone()
            ? new Maybe()
            : fn(this.value)
                ? new Maybe(this.value)
                : new Maybe();
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Maybe.prototype.apply = function (maybe) {
        var _this = this;
        return maybe.flatMap(function (a) { return _this.map(function (b) { return typeof b === 'function' ? b(a) : a; }); });
    };
    Maybe.prototype.toResult = function (error) {
        return this
            .map(function (b) { return new OkResult(b); })
            .valueOr(new FailResult(error));
    };
    return Maybe;
}());
export { Maybe };
//# sourceMappingURL=maybe.js.map