import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGruposDoUsuarioListagemComponent } from'./crude-grupos-do-usuario-listagem.component'

describe('CrudeGruposDoUsuarioListagemComponent', () => {
  let component: CrudeGruposDoUsuarioListagemComponent;
  let fixture: ComponentFixture<CrudeGruposDoUsuarioListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGruposDoUsuarioListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGruposDoUsuarioListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
