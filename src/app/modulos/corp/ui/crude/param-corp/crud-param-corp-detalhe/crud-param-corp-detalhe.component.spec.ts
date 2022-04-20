import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudParamCorpDetalheComponent } from './crud-param-corp-detalhe.component';

describe('CrudParamCorpDetalheComponent', () => {
  let component: CrudParamCorpDetalheComponent;
  let fixture: ComponentFixture<CrudParamCorpDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudParamCorpDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudParamCorpDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
