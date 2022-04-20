import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCondPagtoVendaDetalheComponent } from './crude-cond-pagto-venda-detalhe.component';

describe('CrudeCondPagtoVendaDetalheComponent', () => {
  let component: CrudeCondPagtoVendaDetalheComponent;
  let fixture: ComponentFixture<CrudeCondPagtoVendaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrudeCondPagtoVendaDetalheComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCondPagtoVendaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
