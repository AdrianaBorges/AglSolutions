import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPessoaEmailListagemComponent } from './crude-tipo-pessoa-email-listagem.component';

describe('CrudeTipoPessoaEmailListagemComponent', () => {
  let component: CrudeTipoPessoaEmailListagemComponent;
  let fixture: ComponentFixture<CrudeTipoPessoaEmailListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPessoaEmailListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPessoaEmailListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
