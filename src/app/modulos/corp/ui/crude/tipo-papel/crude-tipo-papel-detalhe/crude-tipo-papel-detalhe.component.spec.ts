import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPapelDetalheComponent } from './crude-tipo-papel-detalhe.component';

describe('CrudeTipoPapelDetalheComponent', () => {
  let component: CrudeTipoPapelDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoPapelDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPapelDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPapelDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
