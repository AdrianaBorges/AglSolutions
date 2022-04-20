import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemDetalheComponent } from './crude-ass-tec-item-detalhe.component';

describe('CrudeAssTecItemDetalheComponent', () => {
  let component: CrudeAssTecItemDetalheComponent;
  let fixture: ComponentFixture<CrudeAssTecItemDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
