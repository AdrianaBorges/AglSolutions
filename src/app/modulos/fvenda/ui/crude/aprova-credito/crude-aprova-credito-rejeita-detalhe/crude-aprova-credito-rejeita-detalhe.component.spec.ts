import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAprovaCreditoRejeitaDetalheComponent } from './crude-aprova-credito-rejeita-detalhe.component';

describe('CrudeAprovaCreditoRejeitaDetalheComponent', () => {
  let component: CrudeAprovaCreditoRejeitaDetalheComponent;
  let fixture: ComponentFixture<CrudeAprovaCreditoRejeitaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAprovaCreditoRejeitaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAprovaCreditoRejeitaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
