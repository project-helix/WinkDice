import { IDriver } from "../interfaces/IDriver";
export type Table = Map<string, any>;
export declare class MemoryDriver implements IDriver {
    store: Map<string, Table>;
    prepare(table: string): Promise<void>;
    getOrCreateTable(name: string): Table;
    deleteAllRows(table: string): Promise<number>;
    deleteRowByKey(table: string, key: string): Promise<number>;
    getAllRows(table: string): Promise<{
        id: string;
        value: any;
    }[]>;
    getRowByKey<T>(table: string, key: string): Promise<[T | null, boolean]>;
    getStartsWith(table: string, query: string): Promise<{
        id: string;
        value: any;
    }[]>;
    setRowByKey<T>(table: string, key: string, value: any, update: boolean): Promise<T>;
}
//# sourceMappingURL=MemoryDriver.d.ts.map