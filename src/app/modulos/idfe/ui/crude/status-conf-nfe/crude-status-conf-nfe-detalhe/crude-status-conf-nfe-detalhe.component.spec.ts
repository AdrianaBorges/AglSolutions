import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeStatusConfNfeDetalheComponent } from './crude-status-conf-nfe-detalhe.component';

describe('CrudeStatusConfNfeDetalheComponent', () => {
  let component: CrudeStatusConfNfeDetalheComponent;
  let fixture: ComponentFixture<CrudeStatusConfNfeDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeStatusConfNfeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeStatusConfNfeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
