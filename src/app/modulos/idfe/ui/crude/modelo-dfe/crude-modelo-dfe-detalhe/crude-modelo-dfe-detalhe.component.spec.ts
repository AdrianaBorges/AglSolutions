import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeModeloDfeDetalheComponent } from './crude-modelo-dfe-detalhe.component';

describe('CrudeModeloDfeDetalheComponent', () => {
  let component: CrudeModeloDfeDetalheComponent;
  let fixture: ComponentFixture<CrudeModeloDfeDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeModeloDfeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeModeloDfeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
