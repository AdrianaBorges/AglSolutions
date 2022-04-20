import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePortadorListagemComponent } from './crude-portador-listagem.component';

describe('CrudePortadorListagemComponent', () => {
  let component: CrudePortadorListagemComponent;
  let fixture: ComponentFixture<CrudePortadorListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePortadorListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePortadorListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
