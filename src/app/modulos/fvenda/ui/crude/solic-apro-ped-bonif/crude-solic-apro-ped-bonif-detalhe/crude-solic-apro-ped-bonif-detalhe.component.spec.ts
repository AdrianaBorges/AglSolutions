import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSolicAproPedBonifDetalheComponent } from './crude-solic-apro-ped-bonif-detalhe.component';

describe('CrudeSolicAproPedBonifDetalheComponent', () => {
  let component: CrudeSolicAproPedBonifDetalheComponent;
  let fixture: ComponentFixture<CrudeSolicAproPedBonifDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSolicAproPedBonifDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSolicAproPedBonifDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
