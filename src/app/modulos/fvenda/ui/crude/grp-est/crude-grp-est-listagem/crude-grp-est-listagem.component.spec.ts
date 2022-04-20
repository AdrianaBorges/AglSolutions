import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrpEstListagemComponent } from './crude-grp-est-listagem.component';

describe('CrudeGrpEstListagemComponent', () => {
  let component: CrudeGrpEstListagemComponent;
  let fixture: ComponentFixture<CrudeGrpEstListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrpEstListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrpEstListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
