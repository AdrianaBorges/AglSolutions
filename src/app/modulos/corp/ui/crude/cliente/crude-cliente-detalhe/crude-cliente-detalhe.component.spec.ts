import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeClienteDetalheComponent } from './crude-cliente-detalhe.component';

describe('CrudeClienteDetalheComponent', () => {
  let component: CrudeClienteDetalheComponent;
  let fixture: ComponentFixture<CrudeClienteDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeClienteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeClienteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
