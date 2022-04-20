import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeFormaCobrancaDetalheComponent } from './crude-forma-cobranca-detalhe.component';

describe('CrudeFormaCobrancaDetalheComponent', () => {
  let component: CrudeFormaCobrancaDetalheComponent;
  let fixture: ComponentFixture<CrudeFormaCobrancaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeFormaCobrancaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeFormaCobrancaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
