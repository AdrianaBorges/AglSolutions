import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRepresVendaJuridicaDetalheComponent } from './crude-repres-venda-juridica-detalhe.component';

describe('CrudeRepresVendaJuridicaDetalheComponent', () => {
  let component: CrudeRepresVendaJuridicaDetalheComponent;
  let fixture: ComponentFixture<CrudeRepresVendaJuridicaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRepresVendaJuridicaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRepresVendaJuridicaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
