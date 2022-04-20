import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrupoDeUsuarioListagemComponent } from './crude-grupo-de-usuario-listagem.component';

describe('CrudeGrupoUsuarioListagemComponent', () => {
  let component: CrudeGrupoDeUsuarioListagemComponent;
  let fixture: ComponentFixture<CrudeGrupoDeUsuarioListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrupoDeUsuarioListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrupoDeUsuarioListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
