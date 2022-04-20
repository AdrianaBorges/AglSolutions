import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oper0012Component } from './oper0012.component';

describe('Oper0012Component', () => {
  let component: Oper0012Component;
  let fixture: ComponentFixture<Oper0012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Oper0012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Oper0012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
