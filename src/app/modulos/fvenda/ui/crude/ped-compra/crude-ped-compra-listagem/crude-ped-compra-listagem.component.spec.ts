import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudePedCompraListagemComponent } from './crude-ped-compra-listagem.component';

describe('CrudePedCompraListagemComponent', () => {
  let component: CrudePedCompraListagemComponent;
  let fixture: ComponentFixture<CrudePedCompraListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudePedCompraListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePedCompraListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
