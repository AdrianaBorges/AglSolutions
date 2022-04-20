import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeTipoEmissaoDfeListagemComponent } from './crude-tipo-emissao-dfe-listagem.component';

describe('CrudeTipoEmissaoDfeListagemComponent', () => {
  let component: CrudeTipoEmissaoDfeListagemComponent;
  let fixture: ComponentFixture<CrudeTipoEmissaoDfeListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoEmissaoDfeListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoEmissaoDfeListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
