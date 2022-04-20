import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaListagemComponent } from './crude-pessoa-listagem.component';

describe('ListagemPessoaComponent', () => {
  let component: CrudePessoaListagemComponent;
  let fixture: ComponentFixture<CrudePessoaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
