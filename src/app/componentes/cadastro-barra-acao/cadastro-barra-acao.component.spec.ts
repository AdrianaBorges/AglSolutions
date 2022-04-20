import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastroBarraAcaoComponent } from './cadastro-barra-acao.component';

describe('CadastroBarraAcaoComponent', () => {
  let component: CadastroBarraAcaoComponent;
  let fixture: ComponentFixture<CadastroBarraAcaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroBarraAcaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroBarraAcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
