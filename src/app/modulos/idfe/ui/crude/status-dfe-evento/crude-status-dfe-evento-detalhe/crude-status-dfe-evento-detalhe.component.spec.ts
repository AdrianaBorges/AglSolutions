import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeStatusDfeEventoDetalheComponent } from './crude-status-dfe-evento-detalhe.component';

describe('CrudeStatusDfeEventoDetalheComponent', () => {
  let component: CrudeStatusDfeEventoDetalheComponent;
  let fixture: ComponentFixture<CrudeStatusDfeEventoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeStatusDfeEventoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeStatusDfeEventoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
