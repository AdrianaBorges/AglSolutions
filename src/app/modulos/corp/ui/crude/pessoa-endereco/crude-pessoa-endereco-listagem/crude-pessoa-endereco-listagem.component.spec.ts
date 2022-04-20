import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaEnderecoListagemComponent } from './crude-pessoa-endereco-listagem.component';

describe('CrudePessoaEnderecoListagemComponent', () => {
  let component: CrudePessoaEnderecoListagemComponent;
  let fixture: ComponentFixture<CrudePessoaEnderecoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaEnderecoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaEnderecoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
