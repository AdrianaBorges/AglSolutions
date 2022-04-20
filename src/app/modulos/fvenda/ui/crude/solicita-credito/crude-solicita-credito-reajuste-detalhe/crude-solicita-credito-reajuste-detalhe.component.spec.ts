import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSolicitaCreditoReajusteDetalheComponent } from './crude-solicita-credito-reajuste-detalhe.component';

describe('CrudeSolicitaCreditoReajusteDetalheComponent', () => {
  let component: CrudeSolicitaCreditoReajusteDetalheComponent;
  let fixture: ComponentFixture<CrudeSolicitaCreditoReajusteDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSolicitaCreditoReajusteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSolicitaCreditoReajusteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
