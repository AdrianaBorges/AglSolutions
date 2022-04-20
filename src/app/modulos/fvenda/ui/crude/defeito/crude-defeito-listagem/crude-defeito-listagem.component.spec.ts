import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeDefeitoListagemComponent } from './crude-defeito-listagem.component';

describe('CrudeDefeitoListagemComponent', () => {
  let component: CrudeDefeitoListagemComponent;
  let fixture: ComponentFixture<CrudeDefeitoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeDefeitoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeDefeitoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
