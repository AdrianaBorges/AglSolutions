import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoCampListagemComponent } from './crude-situacao-camp-listagem.component';

describe('CrudeSituacaoCampListagemComponent', () => {
  let component: CrudeSituacaoCampListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoCampListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoCampListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoCampListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
