import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSequenciaDetalheComponent } from './crude-sequencia-detalhe.component';

describe('CrudeSequenciaDetalheComponent', () => {
  let component: CrudeSequenciaDetalheComponent;
  let fixture: ComponentFixture<CrudeSequenciaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSequenciaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSequenciaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
