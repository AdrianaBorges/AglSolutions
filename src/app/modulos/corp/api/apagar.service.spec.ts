import { TestBed, inject } from '@angular/core/testing';

import { ApagarService } from './apagar.service';

describe('ApagarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApagarService]
    });
  });

  it('should be created', inject([ApagarService], (service: ApagarService) => {
    expect(service).toBeTruthy();
  }));
});
