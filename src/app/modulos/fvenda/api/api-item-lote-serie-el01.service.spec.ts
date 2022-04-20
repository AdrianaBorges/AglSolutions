import { TestBed } from '@angular/core/testing';
import { ApiItemLoteSerieEl01Service } from './api-item-lote-serie-el01.service';


describe('ApiItemLoteSerieEl01Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiItemLoteSerieEl01Service = TestBed.get(ApiItemLoteSerieEl01Service);
    expect(service).toBeTruthy();
  });
});
