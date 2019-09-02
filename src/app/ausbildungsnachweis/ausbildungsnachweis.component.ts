import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AusbildungsnachweisService } from '../shared/ausbildungsnachweis.service';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ausbildungsnachweis',
  templateUrl: './ausbildungsnachweis.component.html',
  styleUrls: ['./ausbildungsnachweis.component.css']
})
export class AusbildungsnachweisComponent implements OnInit {
  nachweisNummer: number;
  nachweisWoche: Observable<any[]>;
  benutzer: any;
  benutzerDaten: Observable<any>;

  tag1 = true;
  tag2 = true;
  tag3 = true;
  tag4 = true;
  tag5 = true;

  constructor(
    private route: ActivatedRoute,
    private service: AusbildungsnachweisService,
    private user: AuthService,
    public afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.nachweisNummer = +this.route.snapshot.paramMap.get('nummer');
    this.nachweisWoche = this.service.loadNachweis(this.nachweisNummer);
    this.benutzer = JSON.parse(localStorage.getItem('user'));
    this.benutzerDaten = this.afs.doc(`users/${this.benutzer.uid}`).valueChanges();
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
