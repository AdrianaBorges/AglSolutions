import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaContaBancoListagemComponent } from './crude-pessoa-conta-banco-listagem.component';

describe('CrudePessoaContaBancoListagemComponent', () => {
  let component: CrudePessoaContaBancoListagemComponent;
  let fixture: ComponentFixture<CrudePessoaContaBancoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaContaBancoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaContaBancoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
