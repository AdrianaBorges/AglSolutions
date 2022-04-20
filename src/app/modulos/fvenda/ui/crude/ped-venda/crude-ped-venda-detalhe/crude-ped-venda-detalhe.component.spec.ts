import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudePedVendaDetalheComponent } from './crude-ped-venda-detalhe.component';

describe('CrudePedVendaDetalheComponent', () => {
  let component: CrudePedVendaDetalheComponent;
  let fixture: ComponentFixture<CrudePedVendaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudePedVendaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePedVendaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
