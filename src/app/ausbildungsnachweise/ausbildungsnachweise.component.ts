import { Component, OnInit } from '@angular/core';
import { AusbildungsnachweisService } from '../shared/ausbildungsnachweis.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ausbildungsnachweise',
  templateUrl: './ausbildungsnachweise.component.html',
  styleUrls: ['./ausbildungsnachweise.component.css']
})
export class AusbildungsnachweiseComponent implements OnInit {

  nachweise: Observable<any[]>;
  nachweiseFachrichtung: Observable<any[]>;

  constructor(public ausbildungsnachweis: AusbildungsnachweisService, public afs: AngularFirestore) { }

  ngOnInit() {
    const benutzer = JSON.parse(localStorage.getItem('user'));
    const benutzerDoc = this.afs.doc(`users/${benutzer.uid}`).valueChanges();
    benutzerDoc.subscribe(user => {
      this.nachweise = this.ausbildungsnachweis.loadData('fi');
      this.nachweiseFachrichtung = this.ausbildungsnachweis.loadData(user['fachrichtung']);
    });
  }
}
