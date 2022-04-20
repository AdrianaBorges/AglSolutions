import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEmpresaDetalheComponent } from './crude-empresa-detalhe.component';

describe('CrudeEmpresaDetalheComponent', () => {
  let component: CrudeEmpresaDetalheComponent;
  let fixture: ComponentFixture<CrudeEmpresaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEmpresaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEmpresaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
