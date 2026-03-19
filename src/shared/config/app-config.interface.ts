export interface IAppConfig {
    NODE_ENV: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_POOL_MIN: number;
    DB_POOL_MAX: number;
}
