import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegCondPagtoDetalheComponent } from './crude-prod-seg-cond-pagto-detalhe.component';

describe('CrudeProdSegCondPagtoDetalheComponent', () => {
  let component: CrudeProdSegCondPagtoDetalheComponent;
  let fixture: ComponentFixture<CrudeProdSegCondPagtoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegCondPagtoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegCondPagtoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
