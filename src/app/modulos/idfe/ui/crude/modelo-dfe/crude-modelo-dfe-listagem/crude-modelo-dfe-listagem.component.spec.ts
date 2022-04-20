import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeModeloDfeListagemComponent } from './crude-modelo-dfe-listagem.component';

describe('CrudeModeloDfeListagemComponent', () => {
  let component: CrudeModeloDfeListagemComponent;
  let fixture: ComponentFixture<CrudeModeloDfeListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeModeloDfeListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeModeloDfeListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
