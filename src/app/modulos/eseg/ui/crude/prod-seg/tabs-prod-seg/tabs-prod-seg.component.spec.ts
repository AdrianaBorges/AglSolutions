import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsProdSegComponent } from './tabs-prod-seg.component';

describe('TabsProdSegComponent', () => {
  let component: TabsProdSegComponent;
  let fixture: ComponentFixture<TabsProdSegComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsProdSegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsProdSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
