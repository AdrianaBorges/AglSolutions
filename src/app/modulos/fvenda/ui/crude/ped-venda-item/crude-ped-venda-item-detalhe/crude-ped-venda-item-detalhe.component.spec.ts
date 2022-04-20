import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudePedVendaItemDetalheComponent } from './crude-ped-venda-item-detalhe.component';

describe('CrudePedVendaItemDetalheComponent', () => {
  let component: CrudePedVendaItemDetalheComponent;
  let fixture: ComponentFixture<CrudePedVendaItemDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudePedVendaItemDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePedVendaItemDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
