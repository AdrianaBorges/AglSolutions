import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoAtenPedListagemComponent } from './crude-situacao-aten-ped-listagem.component';

describe('CrudeSituacaoAtenPedListagemComponent', () => {
  let component: CrudeSituacaoAtenPedListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoAtenPedListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoAtenPedListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoAtenPedListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
