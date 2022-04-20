import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemDefConstListagemComponent } from './crude-ass-tec-item-def-const-listagem.component';

describe('CrudeAssTecItemDefConstListagemComponent', () => {
  let component: CrudeAssTecItemDefConstListagemComponent;
  let fixture: ComponentFixture<CrudeAssTecItemDefConstListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemDefConstListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemDefConstListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
