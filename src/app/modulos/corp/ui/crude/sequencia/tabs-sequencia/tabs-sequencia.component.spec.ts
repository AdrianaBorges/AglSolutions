import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsSequenciaComponent } from './tabs-sequencia.component';

describe('TabsSequenciaComponent', () => {
  let component: TabsSequenciaComponent;
  let fixture: ComponentFixture<TabsSequenciaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsSequenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsSequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
