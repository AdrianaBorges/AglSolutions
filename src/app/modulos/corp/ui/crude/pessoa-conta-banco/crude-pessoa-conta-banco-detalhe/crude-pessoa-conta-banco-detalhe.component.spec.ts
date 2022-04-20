import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaContaBancoDetalheComponent } from './crude-pessoa-conta-banco-detalhe.component';

describe('CrudePessoaContaBancoDetalheComponent', () => {
  let component: CrudePessoaContaBancoDetalheComponent;
  let fixture: ComponentFixture<CrudePessoaContaBancoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaContaBancoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaContaBancoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
