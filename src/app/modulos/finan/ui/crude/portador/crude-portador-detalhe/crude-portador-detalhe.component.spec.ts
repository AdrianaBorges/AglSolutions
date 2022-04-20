import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePortadorDetalheComponent } from './crude-portador-detalhe.component';

describe('CrudePortadorDetalheComponent', () => {
  let component: CrudePortadorDetalheComponent;
  let fixture: ComponentFixture<CrudePortadorDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePortadorDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePortadorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
