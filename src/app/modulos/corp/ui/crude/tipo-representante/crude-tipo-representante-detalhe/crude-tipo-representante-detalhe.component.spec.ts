import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoRepresentanteDetalheComponent } from './crude-tipo-representante-detalhe.component';

describe('CrudeTipoRepresentanteDetalheComponent', () => {
  let component: CrudeTipoRepresentanteDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoRepresentanteDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoRepresentanteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoRepresentanteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
