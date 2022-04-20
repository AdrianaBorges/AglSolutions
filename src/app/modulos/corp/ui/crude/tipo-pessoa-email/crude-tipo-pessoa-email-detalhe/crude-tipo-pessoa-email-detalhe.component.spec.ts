import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPessoaEmailDetalheComponent } from './crude-tipo-pessoa-email-detalhe.component';

describe('CrudeTipoPessoaEmailDetalheComponent', () => {
  let component: CrudeTipoPessoaEmailDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoPessoaEmailDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPessoaEmailDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPessoaEmailDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
