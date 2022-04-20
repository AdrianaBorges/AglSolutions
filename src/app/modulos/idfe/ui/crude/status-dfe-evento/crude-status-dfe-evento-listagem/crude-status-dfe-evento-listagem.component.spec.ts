import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeStatusDfeEventoListagemComponent } from './crude-status-dfe-evento-listagem.component';

describe('CrudeStatusDfeEventoListagemComponent', () => {
  let component: CrudeStatusDfeEventoListagemComponent;
  let fixture: ComponentFixture<CrudeStatusDfeEventoListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeStatusDfeEventoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeStatusDfeEventoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
