import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrauInstDetalheComponent } from './crude-grau-inst-detalhe.component';

describe('CrudeGrauInstDetalheComponent', () => {
  let component: CrudeGrauInstDetalheComponent;
  let fixture: ComponentFixture<CrudeGrauInstDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrauInstDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrauInstDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
