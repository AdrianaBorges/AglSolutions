import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuSistemaComponent } from './menu-sistema.component';

describe('MenuSistemaComponent', () => {
  let component: MenuSistemaComponent;
  let fixture: ComponentFixture<MenuSistemaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
