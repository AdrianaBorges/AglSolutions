import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRepresVendaFisicaDetalheComponent } from './crude-repres-venda-fisica-detalhe.component';

describe('CrudeRepresVendaFisicaDetalheComponent', () => {
  let component: CrudeRepresVendaFisicaDetalheComponent;
  let fixture: ComponentFixture<CrudeRepresVendaFisicaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRepresVendaFisicaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRepresVendaFisicaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
