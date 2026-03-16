import { IRepository } from "@/shared/database";
import { Subscriber, SubscriberDTO } from "@/system/domain/entities/subscriber";

export type SubscriberWhereRepository = SubscriberDTO;

export type ISubscriberRepository = IRepository<Subscriber, SubscriberWhereRepository>;
