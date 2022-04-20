import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastroBarraAcaoContainerBotoesComponent } from './cadastro-barra-acao-container-botoes.component';

describe('CadastroBarraAcaoContainerBotoesComponent', () => {
  let component: CadastroBarraAcaoContainerBotoesComponent;
  let fixture: ComponentFixture<CadastroBarraAcaoContainerBotoesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroBarraAcaoContainerBotoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroBarraAcaoContainerBotoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
