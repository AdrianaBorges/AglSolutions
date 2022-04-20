import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaTelefoneDetalheComponent } from './crude-pessoa-telefone-detalhe.component';

describe('CrudePessoaTelefoneDetalheComponent', () => {
  let component: CrudePessoaTelefoneDetalheComponent;
  let fixture: ComponentFixture<CrudePessoaTelefoneDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaTelefoneDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaTelefoneDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
