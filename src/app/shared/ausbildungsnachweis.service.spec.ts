import { TestBed } from '@angular/core/testing';

import { AusbildungsnachweisService } from './ausbildungsnachweis.service';

describe('AusbildungsnachweisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AusbildungsnachweisService = TestBed.get(AusbildungsnachweisService);
    expect(service).toBeTruthy();
  });
});
