import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoCadListagemComponent } from './crude-situacao-cad-listagem.component';

describe('CrudeSituacaoCadListagemComponent', () => {
  let component: CrudeSituacaoCadListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoCadListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoCadListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoCadListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
