import { IRepository } from "@/shared/database";

import { Model, ModelDTO } from "../../domain/entities/model";

export type ModelWhereRepository = ModelDTO;

export type IModelRepository = IRepository<Model, ModelWhereRepository>;
