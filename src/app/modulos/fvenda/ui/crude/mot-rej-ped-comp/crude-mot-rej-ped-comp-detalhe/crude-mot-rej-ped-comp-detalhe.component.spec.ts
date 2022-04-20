import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeMotRejPedCompDetalheComponent } from './crude-mot-rej-ped-comp-detalhe.component';

describe('CrudeMotRejPedCompDetalheComponent', () => {
  let component: CrudeMotRejPedCompDetalheComponent;
  let fixture: ComponentFixture<CrudeMotRejPedCompDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeMotRejPedCompDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeMotRejPedCompDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
