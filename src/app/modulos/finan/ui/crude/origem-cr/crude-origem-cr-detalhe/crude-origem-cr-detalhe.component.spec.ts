import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeOrigemCrDetalheComponent } from './crude-origem-cr-detalhe.component';

describe('CrudeOrigemCrDetalheComponent', () => {
  let component: CrudeOrigemCrDetalheComponent;
  let fixture: ComponentFixture<CrudeOrigemCrDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeOrigemCrDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeOrigemCrDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
