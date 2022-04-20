import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEspecieItemDetalheComponent } from './crude-especie-item-detalhe.component';

describe('CrudeEspecieItemDetalheComponent', () => {
  let component: CrudeEspecieItemDetalheComponent;
  let fixture: ComponentFixture<CrudeEspecieItemDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEspecieItemDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEspecieItemDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
