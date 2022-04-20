import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemServDetalheComponent } from './crude-ass-tec-item-serv-detalhe.component';

describe('CrudeAssTecItemServDetalheComponent', () => {
  let component: CrudeAssTecItemServDetalheComponent;
  let fixture: ComponentFixture<CrudeAssTecItemServDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemServDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemServDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
