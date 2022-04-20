import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoSolicCredDetalheComponent } from './crude-situacao-solic-cred-detalhe.component';

describe('CrudeSituacaoSolicCredDetalheComponent', () => {
  let component: CrudeSituacaoSolicCredDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoSolicCredDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoSolicCredDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoSolicCredDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
