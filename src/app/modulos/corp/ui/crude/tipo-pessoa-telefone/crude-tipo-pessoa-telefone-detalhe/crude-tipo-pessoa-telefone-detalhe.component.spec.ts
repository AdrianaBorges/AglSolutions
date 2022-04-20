import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPessoaTelefoneDetalheComponent } from './crude-tipo-pessoa-telefone-detalhe.component';

describe('CrudeTipoPessoaTelefoneDetalheComponent', () => {
  let component: CrudeTipoPessoaTelefoneDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoPessoaTelefoneDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPessoaTelefoneDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPessoaTelefoneDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
