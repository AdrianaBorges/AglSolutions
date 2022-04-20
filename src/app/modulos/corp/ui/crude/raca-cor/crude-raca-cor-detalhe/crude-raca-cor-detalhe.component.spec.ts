import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRacaCorDetalheComponent } from './crude-raca-cor-detalhe.component';

describe('CrudeRacaCorDetalheComponent', () => {
  let component: CrudeRacaCorDetalheComponent;
  let fixture: ComponentFixture<CrudeRacaCorDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRacaCorDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRacaCorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
