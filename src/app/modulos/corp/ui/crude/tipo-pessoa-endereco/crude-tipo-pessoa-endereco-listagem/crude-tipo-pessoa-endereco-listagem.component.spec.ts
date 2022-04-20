import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPessoaEnderecoListagemComponent } from './crude-tipo-pessoa-endereco-listagem.component';

describe('CrudeTipoPessoaEnderecoListagemComponent', () => {
  let component: CrudeTipoPessoaEnderecoListagemComponent;
  let fixture: ComponentFixture<CrudeTipoPessoaEnderecoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPessoaEnderecoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPessoaEnderecoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
