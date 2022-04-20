import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeTipoTomadorCteDetalheComponent } from './crude-tipo-tomador-cte-detalhe.component';

describe('CrudeTipoTomadorCteDetalheComponent', () => {
  let component: CrudeTipoTomadorCteDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoTomadorCteDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoTomadorCteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoTomadorCteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
