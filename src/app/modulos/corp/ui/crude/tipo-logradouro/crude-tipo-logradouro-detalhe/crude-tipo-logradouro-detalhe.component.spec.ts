import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoLogradouroDetalheComponent } from './crude-tipo-logradouro-detalhe.component';

describe('CrudeTipoLogradouroDetalheComponent', () => {
  let component: CrudeTipoLogradouroDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoLogradouroDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoLogradouroDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoLogradouroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
