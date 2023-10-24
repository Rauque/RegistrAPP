import { TestBed } from '@angular/core/testing';

import { DatosComunasService } from './datos-comunas.service';

describe('DatosComunasService', () => {
  let service: DatosComunasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosComunasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
