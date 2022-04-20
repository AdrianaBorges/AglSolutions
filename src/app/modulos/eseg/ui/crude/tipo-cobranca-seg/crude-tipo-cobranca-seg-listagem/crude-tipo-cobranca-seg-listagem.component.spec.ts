import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoCobrancaSegListagemComponent } from './crude-tipo-cobranca-seg-listagem.component';

describe('CrudeTipoCobrancaSegListagemComponent', () => {
  let component: CrudeTipoCobrancaSegListagemComponent;
  let fixture: ComponentFixture<CrudeTipoCobrancaSegListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoCobrancaSegListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCobrancaSegListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
