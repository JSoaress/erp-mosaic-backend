import { IRepository } from "@/shared/infra/database";

import { Category, CategoryDTO } from "../../domain/entities/category";

export type CategoryWhereRepository = CategoryDTO;

export type ICategoryRepository = IRepository<Category, CategoryWhereRepository>;
