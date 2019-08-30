import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwVergessenComponent } from './pw-vergessen.component';

describe('PwVergessenComponent', () => {
  let component: PwVergessenComponent;
  let fixture: ComponentFixture<PwVergessenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwVergessenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwVergessenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
