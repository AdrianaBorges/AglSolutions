import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudePedCompraItemListagemComponent } from './crude-ped-compra-item-listagem.component';

describe('CrudePedCompraItemListagemComponent', () => {
  let component: CrudePedCompraItemListagemComponent;
  let fixture: ComponentFixture<CrudePedCompraItemListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudePedCompraItemListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePedCompraItemListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
