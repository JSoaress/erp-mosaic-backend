/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
    export interface Request {
        subscriber: import("@/platform/domain/entities/subscriber").Subscriber;
        queryOptions: import("ts-arch-kit/dist/database").QueryOptions;
        authenticatedUser: import("@/modules/users/domain/entities/auth").AuthenticatedUser;
    }
}
