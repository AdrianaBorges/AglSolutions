import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeCarteiraCrDetalheComponent } from './crude-carteira-cr-detalhe.component';

describe('CrudeCarteiraCrDetalheComponent', () => {
  let component: CrudeCarteiraCrDetalheComponent;
  let fixture: ComponentFixture<CrudeCarteiraCrDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeCarteiraCrDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCarteiraCrDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
