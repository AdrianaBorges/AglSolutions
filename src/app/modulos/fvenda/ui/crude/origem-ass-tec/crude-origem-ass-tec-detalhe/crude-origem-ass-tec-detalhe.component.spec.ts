import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeOrigemAssTecDetalheComponent } from './crude-origem-ass-tec-detalhe.component';

describe('CrudeOrigemAssTecDetalheComponent', () => {
  let component: CrudeOrigemAssTecDetalheComponent;
  let fixture: ComponentFixture<CrudeOrigemAssTecDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeOrigemAssTecDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeOrigemAssTecDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
