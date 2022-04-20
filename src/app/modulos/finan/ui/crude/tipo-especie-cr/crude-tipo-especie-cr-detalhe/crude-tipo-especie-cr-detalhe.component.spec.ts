import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoEspecieCrDetalheComponent } from './crude-tipo-especie-cr-detalhe.component';

describe('CrudeTipoEspecieCrDetalheComponent', () => {
  let component: CrudeTipoEspecieCrDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoEspecieCrDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoEspecieCrDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoEspecieCrDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
