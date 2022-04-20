import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoSeguroDetalheComponent } from './crude-tipo-seguro-detalhe.component';

describe('CrudeTipoSeguroDetalheComponent', () => {
  let component: CrudeTipoSeguroDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoSeguroDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoSeguroDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoSeguroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
