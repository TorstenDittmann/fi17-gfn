import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-pw-vergessen',
  templateUrl: './pw-vergessen.component.html',
  styleUrls: ['./pw-vergessen.component.css']
})
export class PwVergessenComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
