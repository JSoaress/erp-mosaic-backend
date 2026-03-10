import { IRepository } from "@/shared/infra/database";

import { Brand, BrandDTO } from "../../domain/entities/brand";

export type BrandWhereRepository = BrandDTO;

export type IBrandRepository = IRepository<Brand, BrandWhereRepository>;
