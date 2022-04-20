import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrpEstDetalheComponent } from './crude-grp-est-detalhe.component';

describe('CrudeGrpEstDetalheComponent', () => {
  let component: CrudeGrpEstDetalheComponent;
  let fixture: ComponentFixture<CrudeGrpEstDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrpEstDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrpEstDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
