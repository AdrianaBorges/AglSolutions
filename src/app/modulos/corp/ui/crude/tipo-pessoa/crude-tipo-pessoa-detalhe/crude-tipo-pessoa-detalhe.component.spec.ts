import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPessoaDetalheComponent } from './crude-tipo-pessoa-detalhe.component';

describe('CrudeTipoPessoaDetalheComponent', () => {
  let component: CrudeTipoPessoaDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoPessoaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPessoaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPessoaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
