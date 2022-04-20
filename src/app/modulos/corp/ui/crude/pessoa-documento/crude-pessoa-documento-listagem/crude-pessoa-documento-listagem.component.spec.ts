import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaDocumentoListagemComponent } from './crude-pessoa-documento-listagem.component';

describe('CrudePessoaDocumentoListagemComponent', () => {
  let component: CrudePessoaDocumentoListagemComponent;
  let fixture: ComponentFixture<CrudePessoaDocumentoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaDocumentoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaDocumentoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
