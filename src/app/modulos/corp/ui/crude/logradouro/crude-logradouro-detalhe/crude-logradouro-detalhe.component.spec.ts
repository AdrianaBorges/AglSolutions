import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeLogradouroDetalheComponent } from './crude-logradouro-detalhe.component';

describe('CrudeLogradouroDetalheComponent', () => {
  let component: CrudeLogradouroDetalheComponent;
  let fixture: ComponentFixture<CrudeLogradouroDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeLogradouroDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeLogradouroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
