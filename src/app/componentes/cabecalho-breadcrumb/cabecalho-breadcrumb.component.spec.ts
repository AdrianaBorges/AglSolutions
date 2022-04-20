import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CabecalhoBreadcrumbComponent } from './cabecalho-breadcrumb.component';

describe('CabecalhoBreadcrumbComponent', () => {
  let component: CabecalhoBreadcrumbComponent;
  let fixture: ComponentFixture<CabecalhoBreadcrumbComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CabecalhoBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecalhoBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
