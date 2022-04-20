import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsSeguradoraComponent } from './tabs-seguradora.component';

describe('TabsSeguradoraComponent', () => {
  let component: TabsSeguradoraComponent;
  let fixture: ComponentFixture<TabsSeguradoraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsSeguradoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsSeguradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
