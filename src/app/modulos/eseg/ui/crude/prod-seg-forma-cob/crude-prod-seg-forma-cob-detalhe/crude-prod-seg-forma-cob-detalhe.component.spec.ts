import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegFormaCobDetalheComponent } from './crude-prod-seg-forma-cob-detalhe.component';

describe('CrudeProdSegFormaCobDetalheComponent', () => {
  let component: CrudeProdSegFormaCobDetalheComponent;
  let fixture: ComponentFixture<CrudeProdSegFormaCobDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegFormaCobDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegFormaCobDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
