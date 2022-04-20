import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoMovtoCRDetalheComponent } from './crude-tipo-movto-cr-detalhe.component';

describe('CrudeTipoMovtoCRDetalheComponent', () => {
  let component: CrudeTipoMovtoCRDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoMovtoCRDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoMovtoCRDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoMovtoCRDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
