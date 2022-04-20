import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeClienteVendaJuridicaDetalheComponent } from './crude-cliente-venda-juridica-detalhe.component';

describe('CrudeClienteVendaJuridicaDetalheComponent', () => {
  let component: CrudeClienteVendaJuridicaDetalheComponent;
  let fixture: ComponentFixture<CrudeClienteVendaJuridicaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeClienteVendaJuridicaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeClienteVendaJuridicaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
