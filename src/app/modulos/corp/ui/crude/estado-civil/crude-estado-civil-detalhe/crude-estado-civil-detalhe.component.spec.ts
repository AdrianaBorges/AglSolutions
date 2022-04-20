import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEstadoCivilDetalheComponent } from './crude-estado-civil-detalhe.component';

describe('CrudeEstadoCivilDetalheComponent', () => {
  let component: CrudeEstadoCivilDetalheComponent;
  let fixture: ComponentFixture<CrudeEstadoCivilDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEstadoCivilDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEstadoCivilDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
