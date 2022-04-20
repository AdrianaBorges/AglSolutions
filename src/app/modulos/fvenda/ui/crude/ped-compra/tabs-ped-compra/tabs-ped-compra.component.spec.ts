import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPedCompraComponent } from './tabs-ped-compra.component';

describe('TabsPedCompraComponent', () => {
  let component: TabsPedCompraComponent;
  let fixture: ComponentFixture<TabsPedCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsPedCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPedCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
