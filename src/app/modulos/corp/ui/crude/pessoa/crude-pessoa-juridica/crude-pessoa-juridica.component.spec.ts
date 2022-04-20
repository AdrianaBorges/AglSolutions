import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaJuridicaDadosPrincipaisComponent } from './crude-pessoa-juridica-dados-principais.component';

describe('EdicaoPessoaJuridicaComponent', () => {
  let component: CrudePessoaJuridicaDadosPrincipaisComponent;
  let fixture: ComponentFixture<CrudePessoaJuridicaDadosPrincipaisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaJuridicaDadosPrincipaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaJuridicaDadosPrincipaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
