import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSequenciaValorDetalheComponent } from './crude-sequencia-valor-detalhe.component';

describe('CrudeSequenciaValorDetalheComponent', () => {
  let component: CrudeSequenciaValorDetalheComponent;
  let fixture: ComponentFixture<CrudeSequenciaValorDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSequenciaValorDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSequenciaValorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
