import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaEnderecoDetalheComponent } from './crude-pessoa-endereco-detalhe.component';

describe('CrudePessoaEnderecoDetalheComponent', () => {
  let component: CrudePessoaEnderecoDetalheComponent;
  let fixture: ComponentFixture<CrudePessoaEnderecoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaEnderecoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaEnderecoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
