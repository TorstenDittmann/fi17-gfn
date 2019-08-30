import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AusbildungsnachweiseComponent } from './ausbildungsnachweise.component';

describe('AusbildungsnachweiseComponent', () => {
  let component: AusbildungsnachweiseComponent;
  let fixture: ComponentFixture<AusbildungsnachweiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AusbildungsnachweiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AusbildungsnachweiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
