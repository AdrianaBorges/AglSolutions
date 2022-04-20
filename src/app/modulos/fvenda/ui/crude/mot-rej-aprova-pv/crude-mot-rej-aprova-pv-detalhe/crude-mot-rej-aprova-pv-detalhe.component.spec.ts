import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeMotRejAprovaPvDetalheComponent } from './crude-mot-rej-aprova-pv-detalhe.component';

describe('CrudeMotRejAprovaPvDetalheComponent', () => {
  let component: CrudeMotRejAprovaPvDetalheComponent;
  let fixture: ComponentFixture<CrudeMotRejAprovaPvDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeMotRejAprovaPvDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeMotRejAprovaPvDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
