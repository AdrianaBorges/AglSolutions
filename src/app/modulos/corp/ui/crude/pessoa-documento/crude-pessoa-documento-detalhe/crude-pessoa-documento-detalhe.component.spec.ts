import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaDocumentoDetalheComponent } from './crude-pessoa-documento-detalhe.component';

describe('CrudePessoaDocumentoDetalheComponent', () => {
  let component: CrudePessoaDocumentoDetalheComponent;
  let fixture: ComponentFixture<CrudePessoaDocumentoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaDocumentoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaDocumentoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
