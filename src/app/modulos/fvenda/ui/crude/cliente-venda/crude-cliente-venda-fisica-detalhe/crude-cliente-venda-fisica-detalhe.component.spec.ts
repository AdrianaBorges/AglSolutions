import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeClienteVendaFisicaDetalheComponent } from './crude-cliente-venda-fisica-detalhe.component';

describe('CrudeClienteVendaFisicaDetalheComponent', () => {
  let component: CrudeClienteVendaFisicaDetalheComponent;
  let fixture: ComponentFixture<CrudeClienteVendaFisicaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeClienteVendaFisicaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeClienteVendaFisicaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
