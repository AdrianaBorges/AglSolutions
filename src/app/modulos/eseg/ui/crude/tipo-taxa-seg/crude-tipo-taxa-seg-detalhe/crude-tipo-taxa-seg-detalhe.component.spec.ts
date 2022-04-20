import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoTaxaSegDetalheComponent } from './crude-tipo-taxa-seg-detalhe.component';

describe('CrudeTipoTaxaSegDetalheComponent', () => {
  let component: CrudeTipoTaxaSegDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoTaxaSegDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoTaxaSegDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoTaxaSegDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
