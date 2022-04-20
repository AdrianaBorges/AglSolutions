import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeMotivoRejeitaDetalheComponent } from './crude-motivo-rejeita-detalhe.component';

describe('CrudeMotivoRejeitaDetalheComponent', () => {
  let component: CrudeMotivoRejeitaDetalheComponent;
  let fixture: ComponentFixture<CrudeMotivoRejeitaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeMotivoRejeitaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeMotivoRejeitaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
