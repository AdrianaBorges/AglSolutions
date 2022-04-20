import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoTecnicoListagemComponent } from './crude-tipo-tecnico-listagem.component';

describe('CrudeTipoTecnicoListagemComponent', () => {
  let component: CrudeTipoTecnicoListagemComponent;
  let fixture: ComponentFixture<CrudeTipoTecnicoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoTecnicoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoTecnicoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
