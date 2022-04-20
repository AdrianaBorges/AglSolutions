import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegValorDetalheComponent } from './crude-prod-seg-valor-detalhe.component';

describe('CrudeProdSegValorDetalheComponent', () => {
  let component: CrudeProdSegValorDetalheComponent;
  let fixture: ComponentFixture<CrudeProdSegValorDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegValorDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegValorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
