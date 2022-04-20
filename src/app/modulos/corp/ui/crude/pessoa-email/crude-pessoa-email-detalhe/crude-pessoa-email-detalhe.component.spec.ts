import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaEmailDetalheComponent } from './crude-pessoa-email-detalhe.component';

describe('CrudePessoaEmailDetalheComponent', () => {
  let component: CrudePessoaEmailDetalheComponent;
  let fixture: ComponentFixture<CrudePessoaEmailDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaEmailDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaEmailDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
