import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeStatusConfNfeListagemComponent } from './crude-status-conf-nfe-listagem.component';

describe('CrudeStatusConfNfeListagemComponent', () => {
  let component: CrudeStatusConfNfeListagemComponent;
  let fixture: ComponentFixture<CrudeStatusConfNfeListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeStatusConfNfeListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeStatusConfNfeListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
