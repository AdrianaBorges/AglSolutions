import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoAssTecListagemComponent } from './crude-situacao-ass-tec-listagem.component';

describe('CrudeSituacaoAssTecListagemComponent', () => {
  let component: CrudeSituacaoAssTecListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoAssTecListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoAssTecListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoAssTecListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
