import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeTipoEventoDfeListagemComponent } from './crude-tipo-evento-dfe-listagem.component';

describe('CrudeTipoEventoDfeListagemComponent', () => {
  let component: CrudeTipoEventoDfeListagemComponent;
  let fixture: ComponentFixture<CrudeTipoEventoDfeListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoEventoDfeListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoEventoDfeListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
