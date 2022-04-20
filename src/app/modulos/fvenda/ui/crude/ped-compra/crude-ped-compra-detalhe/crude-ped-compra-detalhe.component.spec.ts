import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudePedCompraDetalheComponent } from './crude-ped-compra-detalhe.component';

describe('CrudePedCompraDetalheComponent', () => {
  let component: CrudePedCompraDetalheComponent;
  let fixture: ComponentFixture<CrudePedCompraDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudePedCompraDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePedCompraDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
