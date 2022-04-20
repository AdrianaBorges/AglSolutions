import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApiSelectComponent } from './api-select.component';

describe('AppApiSelectComponent', () => {
  let component: ApiSelectComponent;
  let fixture: ComponentFixture<ApiSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
