import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRamoSeguroDetalheComponent } from './crude-ramo-seguro-detalhe.component';

describe('CrudeRamoSeguroDetalheComponent', () => {
  let component: CrudeRamoSeguroDetalheComponent;
  let fixture: ComponentFixture<CrudeRamoSeguroDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRamoSeguroDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRamoSeguroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
