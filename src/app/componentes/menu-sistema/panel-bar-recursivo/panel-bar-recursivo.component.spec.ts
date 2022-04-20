import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelBarRecursivoComponent } from './panel-bar-recursivo.component';

describe('PanelBarRecursivoComponent', () => {
  let component: PanelBarRecursivoComponent;
  let fixture: ComponentFixture<PanelBarRecursivoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelBarRecursivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBarRecursivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
