import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeTipoEventoDfeDetalheComponent } from './crude-tipo-evento-dfe-detalhe.component';

describe('CrudeTipoEventoDfeDetalheComponent', () => {
  let component: CrudeTipoEventoDfeDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoEventoDfeDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoEventoDfeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoEventoDfeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
