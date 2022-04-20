import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oper0006Component } from './oper0006.component';

describe('Oper0006Component', () => {
  let component: Oper0006Component;
  let fixture: ComponentFixture<Oper0006Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Oper0006Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Oper0006Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
