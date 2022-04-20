import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsAssTecItemComponent } from './tabs-ass-tec-item.component';

describe('TabsAssTecItemComponent', () => {
  let component: TabsAssTecItemComponent;
  let fixture: ComponentFixture<TabsAssTecItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsAssTecItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsAssTecItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
