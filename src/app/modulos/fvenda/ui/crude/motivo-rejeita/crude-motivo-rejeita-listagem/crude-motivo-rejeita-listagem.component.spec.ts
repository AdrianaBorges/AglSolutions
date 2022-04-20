import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeMotivoRejeitaListagemComponent } from './crude-motivo-rejeita-listagem.component';

describe('CrudeMotivoRejeitaListagemComponent', () => {
  let component: CrudeMotivoRejeitaListagemComponent;
  let fixture: ComponentFixture<CrudeMotivoRejeitaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeMotivoRejeitaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeMotivoRejeitaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
