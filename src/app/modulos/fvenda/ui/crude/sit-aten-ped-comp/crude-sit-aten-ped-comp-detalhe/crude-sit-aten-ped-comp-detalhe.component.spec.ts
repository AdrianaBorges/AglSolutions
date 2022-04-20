import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSitAtenPedCompDetalheComponent } from './crude-sit-aten-ped-comp-detalhe.component';

describe('CrudeSitAtenPedCompDetalheComponent', () => {
  let component: CrudeSitAtenPedCompDetalheComponent;
  let fixture: ComponentFixture<CrudeSitAtenPedCompDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSitAtenPedCompDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSitAtenPedCompDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
