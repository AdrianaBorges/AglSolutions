import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCondPagtoDetalheComponent } from './crude-cond-pagto-detalhe.component';

describe('CrudeCondPagtoDetalheComponent', () => {
  let component: CrudeCondPagtoDetalheComponent;
  let fixture: ComponentFixture<CrudeCondPagtoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCondPagtoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCondPagtoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
