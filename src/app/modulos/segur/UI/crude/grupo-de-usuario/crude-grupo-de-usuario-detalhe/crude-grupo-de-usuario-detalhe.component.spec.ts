import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrupoDeUsuarioDetalheComponent } from './crude-grupo-de-usuario-detalhe.component';

describe('CrudeGrupoDeUsuarioDetalheComponent', () => {
  let component: CrudeGrupoDeUsuarioDetalheComponent;
  let fixture: ComponentFixture<CrudeGrupoDeUsuarioDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrupoDeUsuarioDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrupoDeUsuarioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
