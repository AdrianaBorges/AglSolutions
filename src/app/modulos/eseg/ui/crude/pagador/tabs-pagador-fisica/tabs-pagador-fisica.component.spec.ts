import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsPagadorFisicaComponent } from './tabs-pagador-fisica.component';

describe('TabsPagadorFisicaComponent', () => {
  let component: TabsPagadorFisicaComponent;
  let fixture: ComponentFixture<TabsPagadorFisicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPagadorFisicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPagadorFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
