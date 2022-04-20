import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemSubsDetalheComponent } from './crude-ass-tec-item-subs-detalhe.component';

describe('CrudeAssTecItemSubsDetalheComponent', () => {
  let component: CrudeAssTecItemSubsDetalheComponent;
  let fixture: ComponentFixture<CrudeAssTecItemSubsDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemSubsDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemSubsDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
