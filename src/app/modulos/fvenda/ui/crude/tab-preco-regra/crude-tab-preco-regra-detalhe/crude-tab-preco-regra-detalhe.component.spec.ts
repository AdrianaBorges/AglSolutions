import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTabPrecoRegraDetalheComponent } from './crude-tab-preco-regra-detalhe.component';

describe('CrudeTabPrecoRegraDetalheComponent', () => {
  let component: CrudeTabPrecoRegraDetalheComponent;
  let fixture: ComponentFixture<CrudeTabPrecoRegraDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTabPrecoRegraDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTabPrecoRegraDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
