import { TestBed } from '@angular/core/testing';

import { ApiEspecieItemService } from './api-especie-item.service';

describe('ApiEspecieItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiEspecieItemService = TestBed.get(ApiEspecieItemService);
    expect(service).toBeTruthy();
  });
});
