import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaTelefoneListagemComponent } from './crude-pessoa-telefone-listagem.component';

describe('CrudePessoaTelefoneListagemComponent', () => {
  let component: CrudePessoaTelefoneListagemComponent;
  let fixture: ComponentFixture<CrudePessoaTelefoneListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaTelefoneListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaTelefoneListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
