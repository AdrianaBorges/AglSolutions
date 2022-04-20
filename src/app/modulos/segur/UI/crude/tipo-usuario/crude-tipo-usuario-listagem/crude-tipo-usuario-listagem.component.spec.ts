import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoUsuarioListagemComponent } from './crude-tipo-usuario-listagem.component';

describe('CrudeTipoUsuarioListagemComponent', () => {
  let component: CrudeTipoUsuarioListagemComponent;
  let fixture: ComponentFixture<CrudeTipoUsuarioListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoUsuarioListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoUsuarioListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
