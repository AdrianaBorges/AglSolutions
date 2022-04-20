import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsPagadorJuridicaComponent } from './tabs-pagador-juridica.component';

describe('TabsPagadorJuridicaComponent', () => {
  let component: TabsPagadorJuridicaComponent;
  let fixture: ComponentFixture<TabsPagadorJuridicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPagadorJuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPagadorJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
