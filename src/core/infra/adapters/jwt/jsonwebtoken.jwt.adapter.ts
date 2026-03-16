/* eslint-disable @typescript-eslint/no-explicit-any */
import { sign, verify } from "jsonwebtoken";
import { Either, left, right } from "ts-arch-kit/dist/core/helpers";

import { IJwt, DecryptedToken } from "@/shared/application/adapters";
import { InvalidTokenError } from "@/shared/errors";

export class JsonWebToken implements IJwt {
    generate(payload: string, secret: string, expiresIn?: number): string {
        if (expiresIn) return sign({}, secret, { subject: payload, expiresIn });
        return sign({}, secret, { subject: payload });
    }

    verify<O = any>(token: string, secret: string): Either<InvalidTokenError, DecryptedToken<O>> {
        try {
            if (!token) return left(new InvalidTokenError("Token não fornecido."));
            const decrypted = verify(token, secret) as DecryptedToken<O>;
            return right(decrypted);
        } catch (error) {
            return left(new InvalidTokenError());
        }
    }
}
