import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormControlAlertaErroApiComponent } from './form-control-alerta-erro-api.component';

describe('FormControlAlertaErroApiComponent', () => {
  let component: FormControlAlertaErroApiComponent;
  let fixture: ComponentFixture<FormControlAlertaErroApiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlAlertaErroApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlAlertaErroApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
