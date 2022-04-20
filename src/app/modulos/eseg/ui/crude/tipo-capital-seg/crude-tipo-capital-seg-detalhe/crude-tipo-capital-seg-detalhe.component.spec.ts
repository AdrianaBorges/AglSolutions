import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoCapitalSegDetalheComponent } from './crude-tipo-capital-seg-detalhe.component';

describe('CrudeTipoCapitalSegDetalheComponent', () => {
  let component: CrudeTipoCapitalSegDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoCapitalSegDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoCapitalSegDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCapitalSegDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
