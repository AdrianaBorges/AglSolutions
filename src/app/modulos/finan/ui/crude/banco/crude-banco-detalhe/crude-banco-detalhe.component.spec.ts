import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeBancoDetalheComponent } from './crude-banco-detalhe.component';

describe('CrudeBancoDetalheComponent', () => {
  let component: CrudeBancoDetalheComponent;
  let fixture: ComponentFixture<CrudeBancoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeBancoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeBancoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
