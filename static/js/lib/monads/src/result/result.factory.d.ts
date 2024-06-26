import { IResult, Predicate } from './result.interface';
export declare function ok<TOk, TFail>(value: TOk): IResult<TOk, TFail>;
export declare function fail<TOk, TFail>(value: TFail): IResult<TOk, TFail>;
export declare function result<TOk, TFail>(predicate: Predicate, okValue: TOk, failValue: TFail): IResult<TOk, TFail>;
