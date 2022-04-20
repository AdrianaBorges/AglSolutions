import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeAprovaPedBonifRejeitaDetalheComponent } from './crude-aprova-ped-bonif-rejeita-detalhe.component';

describe('CrudeAprovaPedBonifRejeitaDetalheComponent', () => {
  let component: CrudeAprovaPedBonifRejeitaDetalheComponent;
  let fixture: ComponentFixture<CrudeAprovaPedBonifRejeitaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeAprovaPedBonifRejeitaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAprovaPedBonifRejeitaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
