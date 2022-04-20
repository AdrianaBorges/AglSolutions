import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeTipoEmissaoDfeDetalheComponent } from './crude-tipo-emissao-dfe-detalhe.component';

describe('CrudeTipoEmissaoDfeDetalheComponent', () => {
  let component: CrudeTipoEmissaoDfeDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoEmissaoDfeDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoEmissaoDfeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoEmissaoDfeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
