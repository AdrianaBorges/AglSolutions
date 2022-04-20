import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoEnvEmailListagemComponent } from './crude-situacao-env-email-listagem.component';

describe('CrudeSituacaoEnvEmailListagemComponent', () => {
  let component: CrudeSituacaoEnvEmailListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoEnvEmailListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoEnvEmailListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoEnvEmailListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
