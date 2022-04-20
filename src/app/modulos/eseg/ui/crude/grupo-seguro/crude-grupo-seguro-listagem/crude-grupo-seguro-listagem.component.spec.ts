import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrupoSeguroListagemComponent } from './crude-grupo-seguro-listagem.component';

describe('CrudeGrupoSeguroListagemComponent', () => {
  let component: CrudeGrupoSeguroListagemComponent;
  let fixture: ComponentFixture<CrudeGrupoSeguroListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrupoSeguroListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrupoSeguroListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
