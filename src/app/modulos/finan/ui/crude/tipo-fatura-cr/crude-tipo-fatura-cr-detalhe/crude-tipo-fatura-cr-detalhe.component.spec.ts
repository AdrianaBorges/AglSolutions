import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoFaturaCRDetalheComponent } from './crude-tipo-fatura-cr-detalhe.component';

describe('CrudeTipoFaturaCRDetalheComponent', () => {
  let component: CrudeTipoFaturaCRDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoFaturaCRDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoFaturaCRDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoFaturaCRDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
