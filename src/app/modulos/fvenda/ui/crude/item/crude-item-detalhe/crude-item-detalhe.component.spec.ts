import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeItemDetalheComponent } from './crude-item-detalhe.component';

describe('CrudeItemDetalheComponent', () => {
  let component: CrudeItemDetalheComponent;
  let fixture: ComponentFixture<CrudeItemDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeItemDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeItemDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
