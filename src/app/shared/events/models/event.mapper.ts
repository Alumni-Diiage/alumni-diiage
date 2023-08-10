import { Injectable } from "@angular/core";
import { DocumentData } from "@firebase/firestore";
import { BaseMapper } from "../../base.mapper";
import AlumniEvent from "./alumni-event.model";

@Injectable({
  providedIn: 'root'
})
export default class EventMapper implements BaseMapper<AlumniEvent> {

  fromFirestore(data: DocumentData): AlumniEvent {
    return {
      id: data['id'],
      name: data['name']
    }
  }
  toFirestore(entity: AlumniEvent) {
    return {
      name: entity.name
    }
  }

}