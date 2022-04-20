import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoEspecieCrListagemComponent } from './crude-tipo-especie-cr-listagem.component';

describe('CrudeTipoEspecieCrListagemComponent', () => {
  let component: CrudeTipoEspecieCrListagemComponent;
  let fixture: ComponentFixture<CrudeTipoEspecieCrListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoEspecieCrListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoEspecieCrListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
