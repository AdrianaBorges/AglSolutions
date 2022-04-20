import { TestBed } from '@angular/core/testing';

import { ApiTabPrecoItemEL01Service } from './api-tab-preco-item-el01.service';

describe('ApiTabPrecoItemEL01Service', () => {
  let service: ApiTabPrecoItemEL01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTabPrecoItemEL01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
