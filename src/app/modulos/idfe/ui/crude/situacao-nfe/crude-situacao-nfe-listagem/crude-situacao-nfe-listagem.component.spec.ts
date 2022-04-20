import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeSituacaoNfeListagemComponent } from './crude-situacao-nfe-listagem.component';

describe('CrudeSituacaoNfeListagemComponent', () => {
  let component: CrudeSituacaoNfeListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoNfeListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoNfeListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoNfeListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
