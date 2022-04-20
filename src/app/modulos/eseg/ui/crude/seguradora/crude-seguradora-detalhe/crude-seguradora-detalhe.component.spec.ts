import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSeguradoraDetalheComponent } from './crude-seguradora-detalhe.component';

describe('CrudeSeguradoraDetalheComponent', () => {
  let component: CrudeSeguradoraDetalheComponent;
  let fixture: ComponentFixture<CrudeSeguradoraDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSeguradoraDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSeguradoraDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
