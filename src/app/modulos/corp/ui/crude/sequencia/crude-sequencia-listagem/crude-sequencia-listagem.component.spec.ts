import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSequenciaListagemComponent } from './crude-sequencia-listagem.component';

describe('CrudeSequenciaListagemComponent', () => {
  let component: CrudeSequenciaListagemComponent;
  let fixture: ComponentFixture<CrudeSequenciaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSequenciaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSequenciaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
