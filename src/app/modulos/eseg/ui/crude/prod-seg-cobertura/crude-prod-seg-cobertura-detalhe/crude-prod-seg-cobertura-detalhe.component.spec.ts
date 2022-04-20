import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegCoberturaDetalheComponent } from './crude-prod-seg-cobertura-detalhe.component';

describe('CrudeProdSegCoberturaDetalheComponent', () => {
  let component: CrudeProdSegCoberturaDetalheComponent;
  let fixture: ComponentFixture<CrudeProdSegCoberturaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegCoberturaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegCoberturaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
