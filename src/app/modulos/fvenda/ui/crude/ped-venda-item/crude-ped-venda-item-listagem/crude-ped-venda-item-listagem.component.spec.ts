import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudePedVendaItemListagemComponent } from './crude-ped-venda-item-listagem.component';

describe('CrudePedVendaItemListagemComponent', () => {
  let component: CrudePedVendaItemListagemComponent;
  let fixture: ComponentFixture<CrudePedVendaItemListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudePedVendaItemListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePedVendaItemListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
