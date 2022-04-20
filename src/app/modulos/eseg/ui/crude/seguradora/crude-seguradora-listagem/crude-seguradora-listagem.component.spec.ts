import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSeguradoraListagemComponent } from './crude-seguradora-listagem.component';

describe('CrudeSeguradoraListagemComponent', () => {
  let component: CrudeSeguradoraListagemComponent;
  let fixture: ComponentFixture<CrudeSeguradoraListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSeguradoraListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSeguradoraListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
