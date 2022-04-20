import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudePedVendaListagemComponent } from './crude-ped-venda-listagem.component';

describe('CrudePedVendaListagemComponent', () => {
  let component: CrudePedVendaListagemComponent;
  let fixture: ComponentFixture<CrudePedVendaListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudePedVendaListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePedVendaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
