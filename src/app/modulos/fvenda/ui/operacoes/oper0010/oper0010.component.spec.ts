import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oper0010Component } from './oper0010.component';

describe('Oper0010Component', () => {
  let component: Oper0010Component;
  let fixture: ComponentFixture<Oper0010Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Oper0010Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Oper0010Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
