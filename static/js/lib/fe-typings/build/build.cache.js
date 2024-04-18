var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
var TypeCheck = /** @class */ (function () {
    function TypeCheck(handler) {
        this.handler == undefined
            ? (this.handler = console.log)
            : (this.handler = handler);
    }
    TypeCheck.prototype.numSync = function (inp) {
        if (typeof inp == "number")
            return inp;
        else {
            console.log(new Error("<[ERROR]: Expected TypeOf input to be 'number' but got ".concat(typeof inp, ">")));
            return null;
        }
    };
    TypeCheck.prototype.boolSync = function (inp) {
        if (typeof inp == "boolean")
            return inp;
        else {
            console.log(new Error("<[ERROR]: Expected TypeOf input to be 'number' but got ".concat(typeof inp, ">")));
            return null;
        }
    };
    TypeCheck.prototype.funcSync = function (inp) {
        if (typeof inp == "function")
            return inp;
        else {
            console.log(new Error("<[ERROR]: Expected TypeOf input to be 'number' but got ".concat(typeof inp, ">")));
            return null;
        }
    };
    TypeCheck.prototype.objeSync = function (inp) {
        if (typeof inp == "object")
            return inp;
        else {
            console.log(new Error("<[ERROR]: Expected TypeOf input to be 'number' but got ".concat(typeof inp, ">")));
            return null;
        }
    };
    TypeCheck.prototype.striSync = function (inp) {
        if (typeof inp == "string")
            return inp;
        else {
            console.log(new Error("<[ERROR]: Expected TypeOf input to be 'number' but got ".concat(typeof inp, ">")));
            return null;
        }
    };
    TypeCheck.prototype.TypeOfSync = function (type, inp) {
        if (typeof inp == type)
            return inp;
        else {
            console.log(new Error("<[ERROR]: Expected TypeOf input to be 'number' but got ".concat(typeof inp, ">")));
            return null;
        }
    };
    return TypeCheck;
}());
export { TypeCheck };
var TypeCheckAsync = /** @class */ (function (_super) {
    __extends(TypeCheckAsync, _super);
    function TypeCheckAsync(handler) {
        var _this = _super.call(this, handler) || this;
        _this.custom = {
            gender: function (input) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (typeof input === "boolean" || input === null) {
                                // resolve(input)
                                if (input === true)
                                    resolve({ _: "woman", raw: true });
                                if (input === false)
                                    resolve({ _: "man", raw: false });
                                if (input === null)
                                    resolve({ _: "other", raw: null });
                                else
                                    reject("<[ERROR]: Expected TypeOf input to be one of <boolean|null> but got ".concat(typeof input, ">"));
                            }
                            else
                                reject("<[ERROR]: Expected TypeOf input to be one of <boolean|null> but got ".concat(typeof input, ">"));
                        })];
                });
            }); },
        };
        return _this;
    }
    TypeCheckAsync.prototype.num = function (inp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        if (typeof inp == "number")
                            res(inp);
                        else
                            rej("<[ERROR]: Expected TypeOf input to be 'number' but got ".concat(typeof inp, ">"));
                    })];
            });
        });
    };
    TypeCheckAsync.prototype.bool = function (inp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        if (typeof inp == "boolean")
                            res(inp);
                        else
                            rej("<[ERROR]: Expected TypeOf input to be 'boolean' but got ".concat(typeof inp, ">"));
                    })];
            });
        });
    };
    TypeCheckAsync.prototype.func = function (inp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        if (typeof inp == "function")
                            res(inp);
                        else
                            rej("<[ERROR]: Expected TypeOf input to be 'function' but got ".concat(typeof inp, ">"));
                    })];
            });
        });
    };
    TypeCheckAsync.prototype.obje = function (inp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        if (typeof inp == "object")
                            res(inp);
                        else
                            rej("<[ERROR]: Expected TypeOf input to be 'object' but got ".concat(typeof inp, ">"));
                    })];
            });
        });
    };
    TypeCheckAsync.prototype.stri = function (inp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        if (typeof inp == "string")
                            res(inp);
                        else
                            rej("<[ERROR]: Expected TypeOf input to be 'string' but got ".concat(typeof inp, ">"));
                    })];
            });
        });
    };
    TypeCheckAsync.prototype.TypeOf = function (type, inp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        if (typeof inp == type)
                            res(inp);
                        else
                            rej("<[ERROR]: Expected TypeOf input to be '".concat(type, "' but got ").concat(typeof inp, ">"));
                    })];
            });
        });
    };
    return TypeCheckAsync;
}(TypeCheck));
export { TypeCheckAsync };
var Extra = /** @class */ (function (_super) {
    __extends(Extra, _super);
    function Extra(handler) {
        return _super.call(this, handler) || this;
    }
    Extra.prototype.void = function (params, silent) {
        return __awaiter(this, void 0, void 0, function () {
            function exec(input) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        // console.log(`${input}`)
                        // if (typeof input === "function" && `${input}`.startsWith("async")) return await input();
                        if (typeof input === "function")
                            return [2 /*return*/, input()];
                        else if (typeof input === "string")
                            return [2 /*return*/, "'".concat(input, "'")];
                        else
                            return [2 /*return*/, input];
                        return [2 /*return*/];
                    });
                });
            }
            var res, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = [];
                        if (!Array.isArray(params)) return [3 /*break*/, 1];
                        params.forEach(function (task, index) { return __awaiter(_this, void 0, void 0, function () {
                            var resp, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = eval;
                                        return [4 /*yield*/, exec(task)];
                                    case 1:
                                        resp = _a.apply(void 0, [_b.sent()]);
                                        if (silent === false)
                                            console.info(index, "|", resp);
                                        return [2 /*return*/, res.push(resp)];
                                }
                            });
                        }); });
                        //@ts-expect-error
                        return [2 /*return*/, res];
                    case 1:
                        _a = eval;
                        return [4 /*yield*/, exec(params)];
                    case 2:
                        res = _a.apply(void 0, [_b.sent()]);
                        if (silent === false)
                            console.info("single", "|", res);
                        return [2 /*return*/, res];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Extra;
}(TypeCheckAsync));
export { Extra };
var jsTypes = Extra;
export default jsTypes;
//# sourceMappingURL=Types.class.js.map