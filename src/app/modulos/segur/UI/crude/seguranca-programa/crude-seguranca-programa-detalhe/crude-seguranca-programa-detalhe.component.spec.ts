import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSegurancaProgramaDetalheComponent } from './crude-seguranca-programa-detalhe.component';

describe('CrudeSegurancaProgramaDetalheComponent', () => {
  let component: CrudeSegurancaProgramaDetalheComponent;
  let fixture: ComponentFixture<CrudeSegurancaProgramaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSegurancaProgramaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSegurancaProgramaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
