import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoCobrancaListagemComponent } from './crude-tipo-cobranca-listagem.component';

describe('CrudeTipoCobrancaListagemComponent', () => {
  let component: CrudeTipoCobrancaListagemComponent;
  let fixture: ComponentFixture<CrudeTipoCobrancaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoCobrancaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCobrancaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
