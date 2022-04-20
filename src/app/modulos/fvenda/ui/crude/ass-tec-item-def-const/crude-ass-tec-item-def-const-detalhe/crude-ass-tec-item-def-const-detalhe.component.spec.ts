import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemDefConstDetalheComponent } from './crude-ass-tec-item-def-const-detalhe.component';

describe('CrudeAssTecItemDefConstDetalheComponent', () => {
  let component: CrudeAssTecItemDefConstDetalheComponent;
  let fixture: ComponentFixture<CrudeAssTecItemDefConstDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemDefConstDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemDefConstDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
