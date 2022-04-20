import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCidadeListagemComponent } from './crude-cidade-listagem.component';

describe('CrudeCidadeListagemComponent', () => {
  let component: CrudeCidadeListagemComponent;
  let fixture: ComponentFixture<CrudeCidadeListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCidadeListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCidadeListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
