import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoTecnicoDetalheComponent } from './crude-tipo-tecnico-detalhe.component';

describe('CrudeTipoTecnicoDetalheComponent', () => {
  let component: CrudeTipoTecnicoDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoTecnicoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoTecnicoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoTecnicoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
