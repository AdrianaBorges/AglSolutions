import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeAprovaPedBonifAprovaDetalheComponent } from './crude-aprova-ped-bonif-aprova-detalhe.component';

describe('CrudeAprovaPedBonifAprovaDetalheComponent', () => {
  let component: CrudeAprovaPedBonifAprovaDetalheComponent;
  let fixture: ComponentFixture<CrudeAprovaPedBonifAprovaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeAprovaPedBonifAprovaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAprovaPedBonifAprovaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
