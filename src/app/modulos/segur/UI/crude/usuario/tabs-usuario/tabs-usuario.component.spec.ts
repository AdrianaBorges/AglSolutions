import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsUsuarioComponent } from './tabs-usuario.component';

describe('TabsUsuarioComponent', () => {
  let component: TabsUsuarioComponent;
  let fixture: ComponentFixture<TabsUsuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
