import { TestBed, inject } from '@angular/core/testing';

import { CabecalhoBreadcrumbService } from './cabecalho-breadcrumb.service';

describe('CabecalhoBreadcrumbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CabecalhoBreadcrumbService]
    });
  });

  it('should be created', inject([CabecalhoBreadcrumbService], (service: CabecalhoBreadcrumbService) => {
    expect(service).toBeTruthy();
  }));
});
