import { DocumentData } from "@firebase/firestore";

export interface BaseMapper<T> {

  fromFirestore(data: DocumentData): T;

  toFirestore(entity: T): any;
}