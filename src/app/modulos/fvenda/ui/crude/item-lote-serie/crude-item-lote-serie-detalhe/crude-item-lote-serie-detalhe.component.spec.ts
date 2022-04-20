import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeItemLoteSerieDetalheComponent } from './crude-item-lote-serie-detalhe.component';

describe('CrudeItemLoteSerieDetalheComponent', () => {
  let component: CrudeItemLoteSerieDetalheComponent;
  let fixture: ComponentFixture<CrudeItemLoteSerieDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeItemLoteSerieDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeItemLoteSerieDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
