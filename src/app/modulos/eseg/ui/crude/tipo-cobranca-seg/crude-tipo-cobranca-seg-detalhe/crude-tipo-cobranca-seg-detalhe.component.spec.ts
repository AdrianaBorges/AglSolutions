import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoCobrancaSegDetalheComponent } from './crude-tipo-cobranca-seg-detalhe.component';

describe('CrudeTipoCobrancaSegDetalheComponent', () => {
  let component: CrudeTipoCobrancaSegDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoCobrancaSegDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoCobrancaSegDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCobrancaSegDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
