import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeUsuariosDoGrupoListagemComponent } from './crude-usuarios-do-grupo-listagem.component';

describe('CrudeUsuariosDoGrupoListagemComponent', () => {
  let component: CrudeUsuariosDoGrupoListagemComponent;
  let fixture: ComponentFixture<CrudeUsuariosDoGrupoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrudeUsuariosDoGrupoListagemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeUsuariosDoGrupoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
