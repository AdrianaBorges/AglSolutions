import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oper0007Component } from './oper0007.component';

describe('Oper0007Component', () => {
  let component: Oper0007Component;
  let fixture: ComponentFixture<Oper0007Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Oper0007Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Oper0007Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
