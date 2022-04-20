import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaEmailListagemComponent } from './crude-pessoa-email-listagem.component';

describe('CrudePessoaEmailListagemComponent', () => {
  let component: CrudePessoaEmailListagemComponent;
  let fixture: ComponentFixture<CrudePessoaEmailListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaEmailListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaEmailListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
