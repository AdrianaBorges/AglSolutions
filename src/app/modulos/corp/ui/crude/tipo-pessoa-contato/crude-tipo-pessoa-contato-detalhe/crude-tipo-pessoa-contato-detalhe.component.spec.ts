import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPessoaContatoDetalheComponent } from './crude-tipo-pessoa-contato-detalhe.component';

describe('CrudeTipoPessoaContatoDetalheComponent', () => {
  let component: CrudeTipoPessoaContatoDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoPessoaContatoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPessoaContatoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPessoaContatoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
