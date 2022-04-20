import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsSeguradoFisicaComponent } from './tabs-segurado-fisica.component';

describe('TabsSeguradoFisicaComponent', () => {
  let component: TabsSeguradoFisicaComponent;
  let fixture: ComponentFixture<TabsSeguradoFisicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsSeguradoFisicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsSeguradoFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
