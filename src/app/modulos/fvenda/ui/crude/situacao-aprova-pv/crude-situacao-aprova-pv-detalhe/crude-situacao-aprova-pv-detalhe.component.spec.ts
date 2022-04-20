import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoAprovaPvDetalheComponent } from './crude-situacao-aprova-pv-detalhe.component';

describe('CrudeSituacaoAprovaPvDetalheComponent', () => {
  let component: CrudeSituacaoAprovaPvDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoAprovaPvDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoAprovaPvDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoAprovaPvDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
