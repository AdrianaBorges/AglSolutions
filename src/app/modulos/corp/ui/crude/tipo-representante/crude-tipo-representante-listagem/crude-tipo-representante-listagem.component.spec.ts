import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoRepresentanteListagemComponent } from './crude-tipo-representante-listagem.component';

describe('CrudeTipoRepresentanteListagemComponent', () => {
  let component: CrudeTipoRepresentanteListagemComponent;
  let fixture: ComponentFixture<CrudeTipoRepresentanteListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoRepresentanteListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoRepresentanteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
