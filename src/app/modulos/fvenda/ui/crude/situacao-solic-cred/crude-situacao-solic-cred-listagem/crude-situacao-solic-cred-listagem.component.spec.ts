import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoSolicCredListagemComponent } from './crude-situacao-solic-cred-listagem.component';

describe('CrudeSituacaoSolicCredListagemComponent', () => {
  let component: CrudeSituacaoSolicCredListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoSolicCredListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoSolicCredListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoSolicCredListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
