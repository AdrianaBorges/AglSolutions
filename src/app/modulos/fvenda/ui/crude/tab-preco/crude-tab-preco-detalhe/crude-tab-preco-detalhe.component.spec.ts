import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTabPrecoDetalheComponent } from './crude-tab-preco-detalhe.component';

describe('CrudeTabPrecoDetalheComponent', () => {
  let component: CrudeTabPrecoDetalheComponent;
  let fixture: ComponentFixture<CrudeTabPrecoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTabPrecoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTabPrecoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
