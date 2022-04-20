import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoVendaDetalheComponent } from './crude-situacao-venda-detalhe.component';

describe('CrudeSituacaoVendaDetalheComponent', () => {
  let component: CrudeSituacaoVendaDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoVendaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoVendaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoVendaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
