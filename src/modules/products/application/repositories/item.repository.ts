import { IRepository } from "@/shared/database";

import { Item, ItemDTO } from "../../domain/entities/product";

export type ItemWhereRepository = ItemDTO;

export type IItemRepository = IRepository<Item, ItemWhereRepository>;
