import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoDocCrDetalheComponent } from './crude-situacao-doc-cr-detalhe.component';

describe('CrudeSituacaoDocCrDetalheComponent', () => {
  let component: CrudeSituacaoDocCrDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoDocCrDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoDocCrDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoDocCrDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
