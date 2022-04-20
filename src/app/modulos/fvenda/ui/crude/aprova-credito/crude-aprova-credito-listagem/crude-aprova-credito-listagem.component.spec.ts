import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAprovaCreditoListagemComponent } from './crude-aprova-credito-listagem.component';

describe('CrudeAprovaCreditoListagemComponent', () => {
  let component: CrudeAprovaCreditoListagemComponent;
  let fixture: ComponentFixture<CrudeAprovaCreditoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAprovaCreditoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAprovaCreditoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
