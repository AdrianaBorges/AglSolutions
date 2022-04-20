import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEstadoCivilListagemComponent } from './crude-estado-civil-listagem.component';

describe('CrudeEstadoCivilListagemComponent', () => {
  let component: CrudeEstadoCivilListagemComponent;
  let fixture: ComponentFixture<CrudeEstadoCivilListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEstadoCivilListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEstadoCivilListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
