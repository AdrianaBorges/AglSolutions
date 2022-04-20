import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrauParentListagemComponent } from './crude-grau-parent-listagem.component';

describe('CrudeGrauParentListagemComponent', () => {
  let component: CrudeGrauParentListagemComponent;
  let fixture: ComponentFixture<CrudeGrauParentListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrauParentListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrauParentListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
