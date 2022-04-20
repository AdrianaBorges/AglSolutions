import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaContatoDetalheComponent } from './crude-pessoa-contato-detalhe.component';

describe('CrudePessoaContatoDetalheComponent', () => {
  let component: CrudePessoaContatoDetalheComponent;
  let fixture: ComponentFixture<CrudePessoaContatoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaContatoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaContatoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
