import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeNfeDetalheComponent } from './crude-nfe-detalhe.component';

describe('CrudeNfeDetalheComponent', () => {
  let component: CrudeNfeDetalheComponent;
  let fixture: ComponentFixture<CrudeNfeDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeNfeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeNfeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
