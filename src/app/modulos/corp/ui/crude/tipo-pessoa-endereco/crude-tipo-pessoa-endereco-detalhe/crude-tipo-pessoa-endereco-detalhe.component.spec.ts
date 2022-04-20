import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPessoaEnderecoDetalheComponent } from './crude-tipo-pessoa-endereco-detalhe.component';

describe('CrudeTipoPessoaEnderecoDetalheComponent', () => {
  let component: CrudeTipoPessoaEnderecoDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoPessoaEnderecoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPessoaEnderecoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPessoaEnderecoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
