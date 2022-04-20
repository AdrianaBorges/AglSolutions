import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRegiaoDetalheComponent } from './crude-regiao-detalhe.component';

describe('CrudeRegiaoDetalheComponent', () => {
  let component: CrudeRegiaoDetalheComponent;
  let fixture: ComponentFixture<CrudeRegiaoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRegiaoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRegiaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
