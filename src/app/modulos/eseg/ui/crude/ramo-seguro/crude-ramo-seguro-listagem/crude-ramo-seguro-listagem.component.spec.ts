import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRamoSeguroListagemComponent } from './crude-ramo-seguro-listagem.component';

describe('CrudeRamoSeguroListagemComponent', () => {
  let component: CrudeRamoSeguroListagemComponent;
  let fixture: ComponentFixture<CrudeRamoSeguroListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRamoSeguroListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRamoSeguroListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
