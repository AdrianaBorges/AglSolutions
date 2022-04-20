import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoPedidoListagemComponent } from './crude-tipo-pedido-listagem.component';

describe('CrudeTipoPedidoListagemComponent', () => {
  let component: CrudeTipoPedidoListagemComponent;
  let fixture: ComponentFixture<CrudeTipoPedidoListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoPedidoListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPedidoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
