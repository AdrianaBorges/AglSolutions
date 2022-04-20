import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPedVendaComponent } from './tabs-ped-venda.component';

describe('TabsPedVendaComponent', () => {
  let component: TabsPedVendaComponent;
  let fixture: ComponentFixture<TabsPedVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsPedVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPedVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
