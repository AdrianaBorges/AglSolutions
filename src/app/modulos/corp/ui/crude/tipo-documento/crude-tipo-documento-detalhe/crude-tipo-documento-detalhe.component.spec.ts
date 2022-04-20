import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoDocumentoDetalheComponent } from './crude-tipo-documento-detalhe.component';

describe('CrudeTipoDocumentoDetalheComponent', () => {
  let component: CrudeTipoDocumentoDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoDocumentoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoDocumentoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoDocumentoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
