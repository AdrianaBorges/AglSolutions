import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeTipoTomadorCteListagemComponent } from './crude-tipo-tomador-cte-listagem.component';

describe('CrudeTipoTomadorCteListagemComponent', () => {
  let component: CrudeTipoTomadorCteListagemComponent;
  let fixture: ComponentFixture<CrudeTipoTomadorCteListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoTomadorCteListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoTomadorCteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
