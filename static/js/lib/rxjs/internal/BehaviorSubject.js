import { Subject } from './Subject.js';
export class BehaviorSubject extends Subject {
    _value;
    constructor(_value) {
        super();
        this._value = _value;
    }
    get value() {
        return this.getValue();
    }
    _subscribe(subscriber) {
        const subscription = super._subscribe(subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    }
    getValue() {
        const { hasError, thrownError, _value } = this;
        if (hasError) {
            throw thrownError;
        }
        return _value;
    }
    next(value) {
        super.next((this._value = value));
    }
}
//# sourceMappingURL=BehaviorSubject.js.map