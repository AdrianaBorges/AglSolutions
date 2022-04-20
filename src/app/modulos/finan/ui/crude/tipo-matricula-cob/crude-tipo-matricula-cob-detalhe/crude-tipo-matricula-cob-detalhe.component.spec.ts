import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoMatriculaCobDetalheComponent } from './crude-tipo-matricula-cob-detalhe.component';

describe('CrudeTipoMatriculaCobDetalheComponent', () => {
  let component: CrudeTipoMatriculaCobDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoMatriculaCobDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoMatriculaCobDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoMatriculaCobDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
