/* eslint-disable @typescript-eslint/no-explicit-any */
export type CacheSetOptions = {
    ttl?: number;
};

export type CacheIncrementOptions = Pick<CacheSetOptions, "ttl"> & { by?: number };

export interface ICache {
    get<T = any>(key: string): Promise<T | null>;
    set<T = any>(key: string, value: T, options?: CacheSetOptions): Promise<void>;
    increment(key: string, options?: CacheIncrementOptions): Promise<number>;
    decrement(key: string, options?: CacheIncrementOptions): Promise<number>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    clear(): Promise<void>;
}
