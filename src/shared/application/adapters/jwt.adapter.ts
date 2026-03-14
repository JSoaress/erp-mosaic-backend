/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either } from "ts-arch-kit/dist/core/helpers";

import { InvalidTokenError } from "@/shared/errors";

export type DecryptedToken<T> = {
    iat: number;
    exp?: number;
    sub: T;
};

export interface IJwt {
    generate(payload: string, secret: string, expiresIn?: number): string;
    verify<O = any>(token: string, secret: string): Either<InvalidTokenError, DecryptedToken<O>>;
}
