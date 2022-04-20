import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTabPrecoItemDetalheComponent } from './crude-tab-preco-item-detalhe.component';

describe('CrudeTabPrecoItemDetalheComponent', () => {
  let component: CrudeTabPrecoItemDetalheComponent;
  let fixture: ComponentFixture<CrudeTabPrecoItemDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTabPrecoItemDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTabPrecoItemDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
