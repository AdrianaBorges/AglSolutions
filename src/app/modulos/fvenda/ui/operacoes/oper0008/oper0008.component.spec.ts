import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oper0008Component } from './oper0008.component';

describe('Oper0008Component', () => {
  let component: Oper0008Component;
  let fixture: ComponentFixture<Oper0008Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Oper0008Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Oper0008Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
