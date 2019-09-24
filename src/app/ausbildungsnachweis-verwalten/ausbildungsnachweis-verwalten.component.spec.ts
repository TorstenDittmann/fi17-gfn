import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AusbildungsnachweisVerwaltenComponent } from './ausbildungsnachweis-verwalten.component';

describe('AusbildungsnachweisVerwaltenComponent', () => {
  let component: AusbildungsnachweisVerwaltenComponent;
  let fixture: ComponentFixture<AusbildungsnachweisVerwaltenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AusbildungsnachweisVerwaltenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AusbildungsnachweisVerwaltenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
