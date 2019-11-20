import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

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

  loadAllPraktikum(uid) {
    return this.afs.doc('users/' + uid).collection('praktikum', ref =>
      ref.orderBy('nummer', 'desc')).valueChanges();
  }

  loadPraktikum(uid, nummer) {
    return this.afs.doc('users/' + uid).collection(
      'praktikum', ref =>
      ref.where('nummer', '==', nummer))
      .valueChanges({ idField: 'propertyId' });
  }

  loadNachweis(fachrichtung: string, nummer: number) {
    return this.afs.collection(
      'weeks', ref =>
      ref.where('nummer', '==', nummer)
        .where('fachrichtung', '==', fachrichtung))
      .valueChanges({ idField: 'propertyId' });
  }

  getUserData(uid) {
    const userDoc = this.afs.doc('users/' + uid);
    return userDoc.get().toPromise();
  }

  init() { }
}
