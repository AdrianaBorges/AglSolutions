import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecnicaDetalheComponent } from './crude-ass-tecnica-detalhe.component';

describe('CrudeAssTecnicaDetalheComponent', () => {
  let component: CrudeAssTecnicaDetalheComponent;
  let fixture: ComponentFixture<CrudeAssTecnicaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecnicaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecnicaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
