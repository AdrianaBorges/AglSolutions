import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsGrupoSeguroComponent } from './tabs-grupo-seguro.component';

describe('TabsGrupoSeguroComponent', () => {
  let component: TabsGrupoSeguroComponent;
  let fixture: ComponentFixture<TabsGrupoSeguroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsGrupoSeguroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsGrupoSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
