import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AusbildungsnachweisService } from '../shared/ausbildungsnachweis.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-praktikum',
  templateUrl: './praktikum.component.html',
  styleUrls: ['./praktikum.component.css']
})
export class PraktikumComponent implements OnInit {

  nachweise: Observable<any[]>;
  benutzer;

  inputWoche;
  inputNummer;

  constructor(public ausbildungsnachweis: AusbildungsnachweisService, public afs: AngularFirestore) { }

  ngOnInit() {
    this.benutzer = JSON.parse(localStorage.getItem('user'));
    const benutzerDoc = this.afs.doc(`users/${this.benutzer.uid}`).valueChanges();
    benutzerDoc.subscribe(user => {
      this.nachweise = this.ausbildungsnachweis.loadAllPraktikum(this.benutzer.uid);
    });
  }

  erstellen() {
    this.afs.doc('users/' + this.benutzer.uid).collection(
      'praktikum').add({
      dozent: "",
      jahr: 2020,
      nummer: this.inputNummer,
      tag1: "",
      tag2: "",
      tag3: "",
      tag4: "",
      tag5: "",
      wocheIso:  this.inputWoche
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

}
