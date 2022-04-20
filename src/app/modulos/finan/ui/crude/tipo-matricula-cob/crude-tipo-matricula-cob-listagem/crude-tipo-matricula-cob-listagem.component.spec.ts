import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoMatriculaCobListagemComponent } from './crude-tipo-matricula-cob-listagem.component';

describe('CrudeTipoMatriculaCobListagemComponent', () => {
  let component: CrudeTipoMatriculaCobListagemComponent;
  let fixture: ComponentFixture<CrudeTipoMatriculaCobListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoMatriculaCobListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoMatriculaCobListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
