import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegAssistDetalheComponent } from './crude-prod-seg-assist-detalhe.component';

describe('CrudeProdSegAssistDetalheComponent', () => {
  let component: CrudeProdSegAssistDetalheComponent;
  let fixture: ComponentFixture<CrudeProdSegAssistDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegAssistDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegAssistDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
