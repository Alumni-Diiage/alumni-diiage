import { Injectable, inject, Inject, Optional } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, deleteDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { BaseEntity } from './base-entity';
import { BaseMapper } from './base.mapper';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseEntity> {
  protected collection: CollectionReference<DocumentData>;

  firestore = inject(Firestore);

  constructor(
    @Inject('collectionPath') public collectionPath: string,
    @Inject('mapper') public mapper: BaseMapper<T>,
  ) { 
    this.collection = collection(this.firestore, collectionPath);
  }

  get(): Observable<T[]> {
    return collectionData(this.collection, {idField:"id"}).pipe(
      map(items => {
        return items
          .map((o: any) => (this.mapper as BaseMapper<T>).fromFirestore(o))
    }));
  }
  
  async add(item: T): Promise<T> {
    try{
      return addDoc(this.collection, item)
        .then(val => {
          return (this.mapper as BaseMapper<T>).fromFirestore(val)
        })
    } catch(error){
      throw new Error("Impossible d'ajouter l'entité");
      
    }
  }

  async update(item: T) {
    const documentReference = doc(this.firestore, `${this.collectionPath}/${item.id}`);
    try
    {
      return updateDoc(documentReference, (this.mapper as BaseMapper<T>).toFirestore(item));
    }catch(error){
      throw new Error("Impossible de mettre à jour l'entité");
    }
  }

  async delete(id: string) {
    const documentReference = doc(this.firestore,`${this.collectionPath}/${id}`);
    try
    {
      return deleteDoc(documentReference);
    }catch(error){
      throw new Error("Impossible de supprimer l'entité");
    }
  }
}