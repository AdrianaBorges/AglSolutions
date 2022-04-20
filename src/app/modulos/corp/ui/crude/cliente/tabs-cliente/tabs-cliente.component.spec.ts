import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsClienteComponent } from './tabs-cliente.component';

describe('TabsClienteComponent', () => {
  let component: TabsClienteComponent;
  let fixture: ComponentFixture<TabsClienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
