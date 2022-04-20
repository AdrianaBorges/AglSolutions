import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemDefAlegDetalheComponent } from './crude-ass-tec-item-def-aleg-detalhe.component';

describe('CrudeAssTecItemDefAlegDetalheComponent', () => {
  let component: CrudeAssTecItemDefAlegDetalheComponent;
  let fixture: ComponentFixture<CrudeAssTecItemDefAlegDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemDefAlegDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemDefAlegDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
