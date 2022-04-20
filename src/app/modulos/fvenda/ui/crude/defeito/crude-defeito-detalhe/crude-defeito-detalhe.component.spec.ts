import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeDefeitoDetalheComponent } from './crude-defeito-detalhe.component';

describe('CrudeDefeitoDetalheComponent', () => {
  let component: CrudeDefeitoDetalheComponent;
  let fixture: ComponentFixture<CrudeDefeitoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeDefeitoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeDefeitoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
