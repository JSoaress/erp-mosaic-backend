import { describe, expect, test } from "vitest";

import { ValidationError } from "@/shared/errors";

import { CreateSubscriberDTO } from "./subscriber.dto";
import { Subscriber } from "./subscriber.entity";

describe("subscriber entity", () => {
    test("should create a new subscriber", () => {
        const input: CreateSubscriberDTO = {
            name: "John Doe",
            document: "12345678900",
        };
        const subscriberOrError = Subscriber.create(input);
        expect(subscriberOrError.isRight()).toBeTruthy();
        const subscriber = subscriberOrError.value as Subscriber;
        expect(subscriber.getId()).toBe(0);
        expect(subscriber.isNew).toBeTruthy();
        expect(subscriber.get("name")).toBe("John Doe");
        expect(subscriber.get("document")).toBe("12345678900");
        expect(subscriber.get("startedAt")).toBeInstanceOf(Date);
        expect(subscriber.get("endAt")).toBeNull();
        expect(subscriber.get("active")).toBeFalsy();
    });

    test("should not create a subscriber with invalid properties (empty properties)", () => {
        const input: CreateSubscriberDTO = {
            name: "",
            document: "",
        };
        const subscriberOrError = Subscriber.create(input);
        expect(subscriberOrError.isLeft()).toBeTruthy();
        const validationError = subscriberOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
        expect(validationError.getError("document")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
    });

    test("should not create a subscriber with invalid properties (name longer than 50 characters)", () => {
        const input: CreateSubscriberDTO = {
            name: Array(51).fill("a").join(""),
            document: "12345678900",
        };
        const subscriberOrError = Subscriber.create(input);
        expect(subscriberOrError.isLeft()).toBeTruthy();
        const validationError = subscriberOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito grande: esperado que string tivesse <=50 caracteres"]);
    });

    test("should not create a subscriber with invalid properties (blank name)", () => {
        const input: CreateSubscriberDTO = {
            name: " ",
            document: "12345678900",
        };
        const subscriberOrError = Subscriber.create(input);
        expect(subscriberOrError.isLeft()).toBeTruthy();
        const validationError = subscriberOrError.value as ValidationError;
        expect(validationError.getError("name")).toEqual(["Muito pequeno: esperado que string tivesse >=1 caracteres"]);
    });
});
