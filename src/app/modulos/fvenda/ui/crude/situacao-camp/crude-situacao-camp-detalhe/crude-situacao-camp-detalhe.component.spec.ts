import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoCampDetalheComponent } from './crude-situacao-camp-detalhe.component';

describe('CrudeSituacaoCampDetalheComponent', () => {
  let component: CrudeSituacaoCampDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoCampDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoCampDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoCampDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
