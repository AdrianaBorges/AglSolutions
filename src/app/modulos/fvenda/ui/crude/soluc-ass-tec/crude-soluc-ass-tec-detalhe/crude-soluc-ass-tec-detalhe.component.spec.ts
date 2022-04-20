import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSolucAssTecDetalheComponent } from './crude-soluc-ass-tec-detalhe.component';

describe('CrudeSolucAssTecDetalheComponent', () => {
  let component: CrudeSolucAssTecDetalheComponent;
  let fixture: ComponentFixture<CrudeSolucAssTecDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSolucAssTecDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSolucAssTecDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
