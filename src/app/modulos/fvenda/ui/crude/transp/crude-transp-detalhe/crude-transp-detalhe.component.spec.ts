import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTranspDetalheComponent } from './crude-transp-detalhe.component';

describe('CrudeTranspDetalheComponent', () => {
  let component: CrudeTranspDetalheComponent;
  let fixture: ComponentFixture<CrudeTranspDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTranspDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTranspDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
