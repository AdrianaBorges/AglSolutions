import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPessoaContatoListagemComponent } from './crude-tipo-pessoa-contato-listagem.component';

describe('CrudeTipoPessoaContatoListagemComponent', () => {
  let component: CrudeTipoPessoaContatoListagemComponent;
  let fixture: ComponentFixture<CrudeTipoPessoaContatoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPessoaContatoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPessoaContatoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
