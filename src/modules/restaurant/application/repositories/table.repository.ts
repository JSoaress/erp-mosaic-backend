import { IRepository } from "@/shared/database";

import { Table, TableDTO } from "../../domain/entities/table";

export type TableWhereRepository = TableDTO;

export type ITableRepository = IRepository<Table, TableWhereRepository>;
