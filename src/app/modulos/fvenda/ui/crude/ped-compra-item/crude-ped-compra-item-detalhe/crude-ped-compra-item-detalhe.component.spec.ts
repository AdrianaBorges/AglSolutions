import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudePedCompraItemDetalheComponent } from './crude-ped-compra-item-detalhe.component';

describe('CrudePedCompraItemDetalheComponent', () => {
  let component: CrudePedCompraItemDetalheComponent;
  let fixture: ComponentFixture<CrudePedCompraItemDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudePedCompraItemDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePedCompraItemDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
