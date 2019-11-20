import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraktikumComponent } from './praktikum.component';

describe('PraktikumComponent', () => {
  let component: PraktikumComponent;
  let fixture: ComponentFixture<PraktikumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraktikumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraktikumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
