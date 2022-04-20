import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPessoaTelefoneListagemComponent } from './crude-tipo-pessoa-telefone-listagem.component';

describe('CrudeTipoPessoaTelefoneListagemComponent', () => {
  let component: CrudeTipoPessoaTelefoneListagemComponent;
  let fixture: ComponentFixture<CrudeTipoPessoaTelefoneListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPessoaTelefoneListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPessoaTelefoneListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
