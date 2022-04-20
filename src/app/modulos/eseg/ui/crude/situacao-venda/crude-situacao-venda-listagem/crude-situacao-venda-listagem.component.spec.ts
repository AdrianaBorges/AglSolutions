import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoVendaListagemComponent } from './crude-situacao-venda-listagem.component';

describe('CrudeSituacaoVendaListagemComponent', () => {
  let component: CrudeSituacaoVendaListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoVendaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoVendaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoVendaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
