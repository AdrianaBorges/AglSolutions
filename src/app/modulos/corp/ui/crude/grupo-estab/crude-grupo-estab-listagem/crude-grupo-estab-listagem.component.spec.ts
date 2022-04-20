import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeGrupoEstabListagemComponent } from './crude-grupo-estab-listagem.component';

describe('CrudeGrupoEstabListagemComponent', () => {
  let component: CrudeGrupoEstabListagemComponent;
  let fixture: ComponentFixture<CrudeGrupoEstabListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeGrupoEstabListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrupoEstabListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
