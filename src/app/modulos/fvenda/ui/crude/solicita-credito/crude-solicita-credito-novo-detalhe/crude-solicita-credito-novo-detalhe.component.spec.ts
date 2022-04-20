import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSolicitaCreditoNovoDetalheComponent } from './crude-solicita-credito-novo-detalhe.component';

describe('CrudeSolicitaCreditoNovoDetalheComponent', () => {
  let component: CrudeSolicitaCreditoNovoDetalheComponent;
  let fixture: ComponentFixture<CrudeSolicitaCreditoNovoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSolicitaCreditoNovoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSolicitaCreditoNovoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
