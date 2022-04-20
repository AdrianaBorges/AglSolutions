import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CabecalhoSistemaComponent } from './cabecalho-sistema.component';

describe('CabecalhoSistemaComponent', () => {
  let component: CabecalhoSistemaComponent;
  let fixture: ComponentFixture<CabecalhoSistemaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CabecalhoSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecalhoSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
