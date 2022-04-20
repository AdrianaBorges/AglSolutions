import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePagadorListagemComponent } from './crude-pagador-listagem.component';

describe('CrudePagadorListagemComponent', () => {
  let component: CrudePagadorListagemComponent;
  let fixture: ComponentFixture<CrudePagadorListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePagadorListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePagadorListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
