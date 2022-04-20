import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsEstipulanteComponent } from './tabs-estipulante.component';

describe('TabsEstipulanteComponent', () => {
  let component: TabsEstipulanteComponent;
  let fixture: ComponentFixture<TabsEstipulanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsEstipulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsEstipulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
