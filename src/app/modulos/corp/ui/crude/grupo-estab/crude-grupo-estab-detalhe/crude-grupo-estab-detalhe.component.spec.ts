import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeGrupoEstabDetalheComponent } from './crude-grupo-estab-detalhe.component';

describe('CrudeGrupoEstabDetalheComponent', () => {
  let component: CrudeGrupoEstabDetalheComponent;
  let fixture: ComponentFixture<CrudeGrupoEstabDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeGrupoEstabDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrupoEstabDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
