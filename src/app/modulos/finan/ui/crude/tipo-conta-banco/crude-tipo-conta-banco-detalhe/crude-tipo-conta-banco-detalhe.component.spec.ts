import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoContaBancoDetalheComponent } from './crude-tipo-conta-banco-detalhe.component';

describe('CrudeTipoContaBancoDetalheComponent', () => {
  let component: CrudeTipoContaBancoDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoContaBancoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoContaBancoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoContaBancoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
