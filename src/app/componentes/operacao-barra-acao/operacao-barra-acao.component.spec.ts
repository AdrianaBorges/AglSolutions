import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoBarraAcaoComponent } from './operacao-barra-acao.component';

describe('OperacaoBarraAcaoComponent', () => {
  let component: OperacaoBarraAcaoComponent;
  let fixture: ComponentFixture<OperacaoBarraAcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacaoBarraAcaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoBarraAcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
