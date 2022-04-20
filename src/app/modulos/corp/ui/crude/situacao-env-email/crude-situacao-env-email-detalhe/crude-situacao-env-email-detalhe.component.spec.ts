import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoEnvEmailDetalheComponent } from './crude-situacao-env-email-detalhe.component';

describe('CrudeSituacaoEnvEmailDetalheComponent', () => {
  let component: CrudeSituacaoEnvEmailDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoEnvEmailDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoEnvEmailDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoEnvEmailDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
