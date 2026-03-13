import { IRepository } from "@/shared/infra/database";

import { Table, TableDTO } from "../../domain/entities/table";

export type TableWhereRepository = TableDTO;

export type ITableRepository = IRepository<Table, TableWhereRepository>;
