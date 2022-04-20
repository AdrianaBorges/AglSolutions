import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProfissaoDetalheComponent } from './crude-profissao-detalhe.component';

describe('CrudeProfissaoDetalheComponent', () => {
  let component: CrudeProfissaoDetalheComponent;
  let fixture: ComponentFixture<CrudeProfissaoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProfissaoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProfissaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
