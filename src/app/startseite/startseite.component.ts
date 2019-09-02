import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { version } from '../../../package.json';

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

  constructor(public afs: AngularFirestore, ) { }

  ngOnInit() {
    this.benutzer = JSON.parse(localStorage.getItem('user'));
    this.benutzerDoc = this.afs.doc(`users/${this.benutzer.uid}`);
    this.benutzerDaten = this.benutzerDoc.valueChanges();
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

}
