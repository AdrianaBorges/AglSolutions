import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsTabPrecoComponent } from './tabs-tab-preco.component';

describe('TabsTabPrecoComponent', () => {
  let component: TabsTabPrecoComponent;
  let fixture: ComponentFixture<TabsTabPrecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsTabPrecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsTabPrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
