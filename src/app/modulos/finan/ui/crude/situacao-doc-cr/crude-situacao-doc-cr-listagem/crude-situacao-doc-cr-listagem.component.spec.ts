import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoDocCrListagemComponent } from './crude-situacao-doc-cr-listagem.component';

describe('CrudeSituacaoDocCrListagemComponent', () => {
  let component: CrudeSituacaoDocCrListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoDocCrListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoDocCrListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoDocCrListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
