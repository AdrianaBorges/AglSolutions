import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoPedCompDetalheComponent } from './crude-situacao-ped-comp-detalhe.component';

describe('CrudeSituacaoPedCompDetalheComponent', () => {
  let component: CrudeSituacaoPedCompDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoPedCompDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoPedCompDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoPedCompDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
