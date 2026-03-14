/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
    export interface Request {
        subscriber: import("@/system/domain/entities/subscriber").Subscriber;
        tenant: import("@/system/domain/entities/tenant").Tenant;
        queryOptions: import("ts-arch-kit/dist/database").QueryOptions;
        authenticatedUser: import("@/modules/users/domain/entities/auth").AuthenticatedUser;
    }
}
