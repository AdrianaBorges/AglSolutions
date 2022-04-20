import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaFisicaComponent } from './crude-pessoa-fisica.component';

describe('CadastroCrudePessoaFisicaComponent', () => {
  let component: CrudePessoaFisicaComponent;
  let fixture: ComponentFixture<CrudePessoaFisicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaFisicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
