import { IEitherPattern, IEither } from './either.interface';
export declare class Either<L, R> implements IEither<L, R> {
    private readonly left?;
    private readonly right?;
    constructor(left?: L | undefined, right?: R | undefined);
    private static exists;
    private bothExist;
    private neitherExist;
    isLeft(): boolean;
    isRight(): boolean;
    match<T>(pattern: IEitherPattern<L, R, T>): T;
    tap<T>(pattern: Partial<IEitherPattern<L, R, T>>): void;
    map<T>(fn: (r: R) => T): IEither<L, T>;
    flatMap<T>(fn: (r: R) => IEither<L, T>): IEither<L, T>;
}
