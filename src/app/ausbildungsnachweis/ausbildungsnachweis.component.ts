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
  benutzer: User;
  benutzerDaten: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private service: AusbildungsnachweisService,
    private user: AuthService,
    public afs: AngularFirestore,
    ) { }

  ngOnInit() {
    this.nachweisNummer = +this.route.snapshot.paramMap.get('nummer');
    this.nachweisWoche = this.service.loadNachweis(this.nachweisNummer);
    this.benutzer = this.user.userData;
    this.benutzerDaten = this.afs.doc(`users/${this.benutzer.uid}`).valueChanges();
  }

}
