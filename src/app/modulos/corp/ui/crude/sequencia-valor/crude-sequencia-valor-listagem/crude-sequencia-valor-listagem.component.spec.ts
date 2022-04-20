import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSequenciaValorListagemComponent } from './crude-sequencia-valor-listagem.component';

describe('CrudeSequenciaValorListagemComponent', () => {
  let component: CrudeSequenciaValorListagemComponent;
  let fixture: ComponentFixture<CrudeSequenciaValorListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSequenciaValorListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSequenciaValorListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
