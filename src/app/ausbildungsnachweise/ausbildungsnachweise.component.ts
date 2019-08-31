import { Component, OnInit } from '@angular/core';
import { AusbildungsnachweisService } from '../shared/ausbildungsnachweis.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ausbildungsnachweise',
  templateUrl: './ausbildungsnachweise.component.html',
  styleUrls: ['./ausbildungsnachweise.component.css']
})
export class AusbildungsnachweiseComponent implements OnInit {

  nachweise: Observable<any[]>;

  constructor(public ausbildungsnachweis: AusbildungsnachweisService) { }

  ngOnInit() {
    this.nachweise = this.ausbildungsnachweis.loadData();
  }

}
