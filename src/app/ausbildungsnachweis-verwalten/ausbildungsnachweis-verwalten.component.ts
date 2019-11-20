import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { AusbildungsnachweisService } from '../shared/ausbildungsnachweis.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ausbildungsnachweis-verwalten',
  templateUrl: './ausbildungsnachweis-verwalten.component.html',
  styleUrls: ['./ausbildungsnachweis-verwalten.component.css']
})
export class AusbildungsnachweisVerwaltenComponent implements OnInit {
  nachweisNummer: number;
  nachweisFachrichtung: string;

  nachweisWoche: Observable<any[]>;
  nachweisId: string;
  benutzer: any;
  benutzerDoc: AngularFirestoreDocument;
  benutzerDaten: Observable<any>;

  inputDozent: string;
  inputTag1: string;
  inputTag2: string;
  inputTag3: string;
  inputTag4: string;
  inputTag5: string;
  inputWocheIso: number;
  inputNummer: number;

  saveState = true;
  isAdmin = false;
  fachrichtung: string;
  isPraktikum = false;

  constructor(
    private route: ActivatedRoute,
    private service: AusbildungsnachweisService,
    public afs: AngularFirestore,
    public routers: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.fachrichtung = this.route.snapshot.paramMap.get('fachrichtung');
    this.benutzer = JSON.parse(localStorage.getItem('user'));
    this.benutzerDoc = this.afs.doc(`users/${this.benutzer.uid}`);
    this.benutzerDaten = this.benutzerDoc.valueChanges();
    this.benutzerDaten.subscribe(b => {
      this.nachweisFachrichtung = b.fachrichtung;
      this.nachweisNummer = +this.route.snapshot.paramMap.get('nummer');
      if (this.fachrichtung == "praktikum") {
        this.isPraktikum = true;
        this.nachweisWoche = this.service.loadPraktikum(this.benutzer.uid, this.nachweisNummer);
      } else {
        this.nachweisWoche = this.service.loadNachweis(this.nachweisFachrichtung, this.nachweisNummer);
      }

      this.nachweisWoche.subscribe(e => {
        this.inputDozent = e[0].dozent;
        this.inputTag1 = e[0].tag1;
        this.inputTag2 = e[0].tag2;
        this.inputTag3 = e[0].tag3;
        this.inputTag4 = e[0].tag4;
        this.inputTag5 = e[0].tag5;
        this.nachweisId = e[0].propertyId;
      });
      if (b.isAdmin) {
        this.isAdmin = true;
      }
    });
  }

  switchSaveState() {
    this.saveState = false;
  }

  updateNachweis() {
    const datensatz = {
      dozent: this.inputDozent,
      tag1: this.inputTag1,
      tag2: this.inputTag2,
      tag3: this.inputTag3,
      tag4: this.inputTag4,
      tag5: this.inputTag5
    };
    if (this.fachrichtung == "praktikum") {
      this.afs.doc(`users/${this.benutzer.uid}/praktikum/${this.nachweisId}`).update(datensatz).then(() => {
        this.saveState = true;
      });
    } else {
      this.afs.doc(`weeks/${this.nachweisId}`).update(datensatz).then(() => {
        this.saveState = true;
      });
    }
  }
  deleteNachweis() {
    this.afs.doc(`users/${this.benutzer.uid}/praktikum/${this.nachweisId}`).delete().then(() => {
      console.log("Document successfully deleted!");
      this.routers.navigateByUrl('/praktikum');
    }).catch(error => {
      window.alert("Error removing document: "+ error);
    });
  }
  goBack() {
    this._location.back();
  }
}
