import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoAssTecDetalheComponent } from './crude-tipo-ass-tec-detalhe.component';

describe('CrudeTipoAssTecDetalheComponent', () => {
  let component: CrudeTipoAssTecDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoAssTecDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoAssTecDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoAssTecDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
