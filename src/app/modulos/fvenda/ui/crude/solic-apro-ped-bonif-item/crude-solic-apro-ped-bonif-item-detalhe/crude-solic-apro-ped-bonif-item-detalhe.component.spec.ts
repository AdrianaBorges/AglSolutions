import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSolicAproPedBonifItemDetalheComponent } from './crude-solic-apro-ped-bonif-item-detalhe.component';

describe('CrudeSolicAproPedBonifItemDetalheComponent', () => {
  let component: CrudeSolicAproPedBonifItemDetalheComponent;
  let fixture: ComponentFixture<CrudeSolicAproPedBonifItemDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSolicAproPedBonifItemDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSolicAproPedBonifItemDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
