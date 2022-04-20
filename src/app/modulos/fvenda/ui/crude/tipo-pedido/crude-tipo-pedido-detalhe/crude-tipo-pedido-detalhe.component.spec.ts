import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoPedidoDetalheComponent } from './crude-tipo-pedido-detalhe.component';

describe('CrudeTipoPedidoDetalheComponent', () => {
  let component: CrudeTipoPedidoDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoPedidoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoPedidoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPedidoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
