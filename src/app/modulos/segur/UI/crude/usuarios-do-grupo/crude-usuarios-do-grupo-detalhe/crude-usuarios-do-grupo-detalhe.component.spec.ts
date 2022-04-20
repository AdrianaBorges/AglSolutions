import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeUsuariosDoGrupoDetalheComponent } from './crude-usuarios-do-grupo-detalhe.component';

describe('CrudeUsuariosDoGrupoDetalheComponent', () => {
  let component: CrudeUsuariosDoGrupoDetalheComponent;
  let fixture: ComponentFixture<CrudeUsuariosDoGrupoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrudeUsuariosDoGrupoDetalheComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeUsuariosDoGrupoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
