import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoCadDetalheComponent } from './crude-situacao-cad-detalhe.component';

describe('CrudeSituacaoCadDetalheComponent', () => {
  let component: CrudeSituacaoCadDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoCadDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoCadDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoCadDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
