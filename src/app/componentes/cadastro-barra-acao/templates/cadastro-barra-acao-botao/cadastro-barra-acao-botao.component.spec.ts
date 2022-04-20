import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastroBarraAcaoBotaoComponent } from './cadastro-barra-acao-botao.component';

describe('CadastroBarraAcaoBotaoComponent', () => {
  let component: CadastroBarraAcaoBotaoComponent;
  let fixture: ComponentFixture<CadastroBarraAcaoBotaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroBarraAcaoBotaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroBarraAcaoBotaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
