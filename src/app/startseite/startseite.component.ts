import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { version } from '../../../package.json';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit {
  public version: string = version;
  benutzerDaten: Observable<any>;
  benutzer: any;
  benutzerDoc: AngularFirestoreDocument<any>;
  neueVersion = false;

  constructor(public afs: AngularFirestore, private swUpdate: SwUpdate) { }

  ngOnInit() {
    this.benutzer = JSON.parse(localStorage.getItem('user'));
    this.benutzerDoc = this.afs.doc(`users/${this.benutzer.uid}`);
    this.benutzerDaten = this.benutzerDoc.valueChanges();
    this.swUpdate.available.subscribe(evt => {
      this.neueVersion = true;
    });
  }

  editDisplayName(value) {
    this.benutzerDoc.update({
      displayName: value
    });
  }

  editAusbilder(value) {
    this.benutzerDoc.update({
      ausbilder: value
    });
  }

  editFachrichtung(value) {
    this.benutzerDoc.update({
      fachrichtung: value
    });
  }

}
