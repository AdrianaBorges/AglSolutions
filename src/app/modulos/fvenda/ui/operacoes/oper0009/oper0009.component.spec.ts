import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oper0009Component } from './oper0009.component';

describe('Oper0009Component', () => {
  let component: Oper0009Component;
  let fixture: ComponentFixture<Oper0009Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Oper0009Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Oper0009Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
