import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProfissaoListagemComponent } from './crude-profissao-listagem.component';

describe('CrudeProfissaoListagemComponent', () => {
  let component: CrudeProfissaoListagemComponent;
  let fixture: ComponentFixture<CrudeProfissaoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProfissaoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProfissaoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
