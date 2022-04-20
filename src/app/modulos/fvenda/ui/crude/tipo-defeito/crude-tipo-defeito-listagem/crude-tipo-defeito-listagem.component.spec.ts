import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoDefeitoListagemComponent } from './crude-tipo-defeito-listagem.component';

describe('CrudeTipoDefeitoListagemComponent', () => {
  let component: CrudeTipoDefeitoListagemComponent;
  let fixture: ComponentFixture<CrudeTipoDefeitoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoDefeitoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoDefeitoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
