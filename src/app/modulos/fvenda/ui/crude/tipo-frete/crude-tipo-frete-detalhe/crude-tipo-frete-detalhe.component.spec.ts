import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoFreteDetalheComponent } from './crude-tipo-frete-detalhe.component';

describe('CrudeTipoFreteDetalheComponent', () => {
  let component: CrudeTipoFreteDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoFreteDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoFreteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoFreteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
