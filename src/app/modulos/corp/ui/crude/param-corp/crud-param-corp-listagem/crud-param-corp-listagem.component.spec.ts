import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudParamCorpListagemComponent } from './crud-param-corp-listagem.component';

describe('CrudParamCorpListagemComponent', () => {
  let component: CrudParamCorpListagemComponent;
  let fixture: ComponentFixture<CrudParamCorpListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudParamCorpListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudParamCorpListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
