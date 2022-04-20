import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaContatoListagemComponent } from './crude-pessoa-contato-listagem.component';

describe('CrudePessoaContatoListagemComponent', () => {
  let component: CrudePessoaContatoListagemComponent;
  let fixture: ComponentFixture<CrudePessoaContatoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaContatoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaContatoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
