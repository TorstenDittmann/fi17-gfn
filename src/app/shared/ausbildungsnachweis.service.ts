import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AusbildungsnachweisService {

  constructor(public afs: AngularFirestore) { }

  loadData() {
    return this.afs.collection('weeks', ref => ref.orderBy('nummer', 'desc')).valueChanges();
  }

  loadNachweis(nummer: number) {
    return this.afs.collection('weeks', ref => ref.where('nummer', '==', nummer)).valueChanges();
  }

  getUserData(uid) {
    const productsDocuments = this.afs.doc('users/' + uid);
    return productsDocuments.get().toPromise();
  }

  init() { }
}
