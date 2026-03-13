import { Table } from "@/modules/restaurant/domain/entities/table";
import { CreateUseCase, DeleteUseCase, FetchUseCase, UpdateUseCase } from "@/shared/application";

import { IRepositoryFactory } from "../../repositories";
import {
    CreateTableUseCaseGateway,
    CreateTableUseCaseInput,
    CreateTableUseCaseOutput,
    DeleteTableUseCaseGateway,
    DeleteTableUseCaseInput,
    DeleteTableUseCaseOutput,
    FetchTablesUseCaseGateway,
    FetchTablesUseCaseInput,
    FetchTablesUseCaseOutput,
    UpdateTableUseCaseGateway,
    UpdateTableUseCaseInput,
    UpdateTableUseCaseOutput,
} from "./types";

export function FetchTablesUseCase(gateway: FetchTablesUseCaseGateway) {
    return new FetchUseCase<FetchTablesUseCaseInput, FetchTablesUseCaseOutput, IRepositoryFactory>({
        ...gateway,
        repo: "createTableRepository",
    });
}

export function CreateTableUseCase(gateway: CreateTableUseCaseGateway) {
    return new CreateUseCase<CreateTableUseCaseInput, CreateTableUseCaseOutput, IRepositoryFactory>({
        ...gateway,
        repo: "createTableRepository",
        createEntityFn: Table.create,
    });
}

export function UpdateTableUseCase(gateway: UpdateTableUseCaseGateway) {
    return new UpdateUseCase<UpdateTableUseCaseInput, UpdateTableUseCaseOutput, IRepositoryFactory>({
        ...gateway,
        repo: "createTableRepository",
        entityName: Table.name,
    });
}

export function DeleteTableUseCase(gateway: DeleteTableUseCaseGateway) {
    return new DeleteUseCase<DeleteTableUseCaseInput, DeleteTableUseCaseOutput, IRepositoryFactory>({
        ...gateway,
        repo: "createTableRepository",
        entityName: Table.name,
    });
}
