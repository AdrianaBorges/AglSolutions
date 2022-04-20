import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEstipulanteDetalheComponent } from './crude-estipulante-detalhe.component';

describe('CrudeEstipulanteDetalheComponent', () => {
  let component: CrudeEstipulanteDetalheComponent;
  let fixture: ComponentFixture<CrudeEstipulanteDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEstipulanteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEstipulanteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
