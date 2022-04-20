import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeOrigemPedVenDetalheComponent } from './crude-origem-ped-ven-detalhe.component';

describe('CrudeOrigemPedVenDetalheComponent', () => {
  let component: CrudeOrigemPedVenDetalheComponent;
  let fixture: ComponentFixture<CrudeOrigemPedVenDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeOrigemPedVenDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeOrigemPedVenDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
