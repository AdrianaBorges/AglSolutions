import { TestBed } from '@angular/core/testing';

import { AssetsLocaleService } from './assets-locale.service';

describe('AssetsLocaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetsLocaleService = TestBed.get(AssetsLocaleService);
    expect(service).toBeTruthy();
  });
});
