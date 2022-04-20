import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEmpresaTabsComponent } from './crude-empresa-tabs.component';

describe('CrudeEmpresaTabsComponent', () => {
  let component: CrudeEmpresaTabsComponent;
  let fixture: ComponentFixture<CrudeEmpresaTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEmpresaTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEmpresaTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
