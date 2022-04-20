import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsRepresentanteComponent } from './tabs-representante.component';

describe('TabsRepresentanteComponent', () => {
  let component: TabsRepresentanteComponent;
  let fixture: ComponentFixture<TabsRepresentanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsRepresentanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
