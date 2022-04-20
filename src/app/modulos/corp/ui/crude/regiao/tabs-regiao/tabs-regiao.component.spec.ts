import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsRegiaoComponent } from './tabs-regiao.component';

describe('TabsRegiaoComponent', () => {
  let component: TabsRegiaoComponent;
  let fixture: ComponentFixture<TabsRegiaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsRegiaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsRegiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
