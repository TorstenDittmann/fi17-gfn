import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AusbildungsnachweisService {


  constructor(public afs: AngularFirestore) { }

  loadData(fachrichtung: string) {
    return this.afs.collection('weeks', ref =>
    ref.orderBy('nummer', 'desc')
    .where('fachrichtung', '==', fachrichtung)).valueChanges();
  }

  loadNachweis(fachrichtung: string, nummer: number) {
    return this.afs.collection('weeks', ref => ref.where('nummer', '==', nummer)).valueChanges();
  }

  getUserData(uid) {
    const userDoc = this.afs.doc('users/' + uid);
    return userDoc.get().toPromise();
  }

  init() { }
}
