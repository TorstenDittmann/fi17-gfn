import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AusbildungsnachweisService } from '../shared/ausbildungsnachweis.service';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ausbildungsnachweis',
  templateUrl: './ausbildungsnachweis.component.html',
  styleUrls: ['./ausbildungsnachweis.component.css']
})
export class AusbildungsnachweisComponent implements OnInit {
  nachweisNummer: number;
  nachweisFachrichtung: string;
  nachweisWoche: Observable<any[]>;
  benutzer: any;
  benutzerDaten: Observable<any>;
  dozentTitel = "Dozent";

  constructor(
    private route: ActivatedRoute,
    private service: AusbildungsnachweisService,
    public afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.benutzer = JSON.parse(localStorage.getItem('user'));
    this.benutzerDaten = this.afs.doc(`users/${this.benutzer.uid}`).valueChanges();
    this.nachweisNummer = +this.route.snapshot.paramMap.get('nummer');
    this.nachweisFachrichtung = this.route.snapshot.paramMap.get('fachrichtung');
    if(this.nachweisFachrichtung == "praktikum") {
      this.dozentTitel = "Betreuer"
      this.nachweisWoche = this.service.loadPraktikum(this.benutzer.uid, this.nachweisNummer);
    } else {
      this.nachweisWoche = this.service.loadNachweis(this.nachweisFachrichtung, this.nachweisNummer);
    }
  }

  getDate(weekIso, year) {
    const d = this.getDateByWeek(weekIso, year);
    const montag = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const freitag = new Date(d.getFullYear(), d.getMonth(), (d.getDate() + 4));
    return this.zeroPad(montag.getDate(), 2) + '.' + this.zeroPad((montag.getMonth() + 1), 2) + '.' + montag.getFullYear() +
      ' - ' + this.zeroPad(freitag.getDate(), 2) + '.' + this.zeroPad((freitag.getMonth() + 1), 2) + '.' + freitag.getFullYear();
  }

  getDateByWeek(weeks, year) {
    const d = new Date(year, 0, 1);
    const dayNum = d.getDay();
    let requiredDate = (weeks - 2) * 7;
    if (((dayNum !== 0) || dayNum > 4)) {
      requiredDate += 7;
    }
    d.setDate(1 - d.getDay() + ++requiredDate);
    return d;
  }
  zeroPad(num, places) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }
}
