import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRepresentanteListagemComponent } from './crude-representante-listagem.component';

describe('CrudeRepresentanteListagemComponent', () => {
  let component: CrudeRepresentanteListagemComponent;
  let fixture: ComponentFixture<CrudeRepresentanteListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRepresentanteListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRepresentanteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
