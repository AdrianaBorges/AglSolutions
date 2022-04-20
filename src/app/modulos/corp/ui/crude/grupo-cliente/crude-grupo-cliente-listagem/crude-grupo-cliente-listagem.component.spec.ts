import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrupoClienteListagemComponent } from './crude-grupo-cliente-listagem.component';

describe('CrudeGrupoClienteListagemComponent', () => {
  let component: CrudeGrupoClienteListagemComponent;
  let fixture: ComponentFixture<CrudeGrupoClienteListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrupoClienteListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrupoClienteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
