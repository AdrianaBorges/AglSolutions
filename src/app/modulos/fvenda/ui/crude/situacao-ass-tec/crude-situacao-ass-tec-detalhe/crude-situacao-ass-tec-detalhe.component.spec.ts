import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoAssTecDetalheComponent } from './crude-situacao-ass-tec-detalhe.component';

describe('CrudeSituacaoAssTecDetalheComponent', () => {
  let component: CrudeSituacaoAssTecDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoAssTecDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoAssTecDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoAssTecDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
