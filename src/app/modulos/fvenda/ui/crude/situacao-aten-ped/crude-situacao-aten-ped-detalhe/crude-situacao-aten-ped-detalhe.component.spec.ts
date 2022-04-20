import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoAtenPedDetalheComponent } from './crude-situacao-aten-ped-detalhe.component';

describe('CrudeSituacaoAtenPedDetalheComponent', () => {
  let component: CrudeSituacaoAtenPedDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoAtenPedDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoAtenPedDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoAtenPedDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
