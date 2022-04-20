import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoCobrancaDetalheComponent } from './crude-tipo-cobranca-detalhe.component';

describe('CrudeTipoCobrancaDetalheComponent', () => {
  let component: CrudeTipoCobrancaDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoCobrancaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoCobrancaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCobrancaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
