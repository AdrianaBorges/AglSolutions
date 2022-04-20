import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrauParentDetalheComponent } from './crude-grau-parent-detalhe.component';

describe('CrudeGrauParentDetalheComponent', () => {
  let component: CrudeGrauParentDetalheComponent;
  let fixture: ComponentFixture<CrudeGrauParentDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrauParentDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrauParentDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
