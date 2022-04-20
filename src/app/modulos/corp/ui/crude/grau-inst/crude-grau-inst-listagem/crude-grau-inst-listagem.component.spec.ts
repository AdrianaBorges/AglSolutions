import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrauInstListagemComponent } from './crude-grau-inst-listagem.component';

describe('CrudeGrauInstListagemComponent', () => {
  let component: CrudeGrauInstListagemComponent;
  let fixture: ComponentFixture<CrudeGrauInstListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrauInstListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrauInstListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
