import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAprovaCreditoAprovaDetalheComponent } from './crude-aprova-credito-aprova-detalhe.component';

describe('CrudeAprovaCreditoAprovaDetalheComponent', () => {
  let component: CrudeAprovaCreditoAprovaDetalheComponent;
  let fixture: ComponentFixture<CrudeAprovaCreditoAprovaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAprovaCreditoAprovaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAprovaCreditoAprovaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
