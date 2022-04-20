import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssistSegDetalheComponent } from './crude-assist-seg-detalhe.component';

describe('CrudeAssistSegDetalheComponent', () => {
  let component: CrudeAssistSegDetalheComponent;
  let fixture: ComponentFixture<CrudeAssistSegDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssistSegDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssistSegDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
