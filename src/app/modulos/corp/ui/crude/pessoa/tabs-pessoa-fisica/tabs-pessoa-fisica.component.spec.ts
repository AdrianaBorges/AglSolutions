import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePessoaFisicaTabsComponent } from './crude-pessoa-fisica-tabs.component';

describe('EdicaoPessoaComponent', () => {
  let component: CrudePessoaFisicaTabsComponent;
  let fixture: ComponentFixture<CrudePessoaFisicaTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePessoaFisicaTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePessoaFisicaTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
