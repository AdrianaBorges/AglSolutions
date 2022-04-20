import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssistSegListagemComponent } from './crude-assist-seg-listagem.component';

describe('CrudeAssistSegListagemComponent', () => {
  let component: CrudeAssistSegListagemComponent;
  let fixture: ComponentFixture<CrudeAssistSegListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssistSegListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssistSegListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
