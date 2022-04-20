import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRepresentanteDetalheComponent } from './crude-representante-detalhe.component';

describe('CrudeRepresentanteDetalheComponent', () => {
  let component: CrudeRepresentanteDetalheComponent;
  let fixture: ComponentFixture<CrudeRepresentanteDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRepresentanteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRepresentanteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
