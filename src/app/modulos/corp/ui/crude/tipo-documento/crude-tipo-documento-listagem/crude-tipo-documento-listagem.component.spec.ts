import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoDocumentoListagemComponent } from './crude-tipo-documento-listagem.component';

describe('CrudeTipoDocumentoListagemComponent', () => {
  let component: CrudeTipoDocumentoListagemComponent;
  let fixture: ComponentFixture<CrudeTipoDocumentoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoDocumentoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoDocumentoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
