import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoPedVenDetalheComponent } from './crude-situacao-ped-ven-detalhe.component';

describe('CrudeSituacaoPedVenDetalheComponent', () => {
  let component: CrudeSituacaoPedVenDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoPedVenDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoPedVenDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoPedVenDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
