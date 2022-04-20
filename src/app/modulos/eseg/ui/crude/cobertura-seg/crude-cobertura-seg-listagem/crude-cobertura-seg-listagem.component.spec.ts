import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCoberturaSegListagemComponent } from './crude-cobertura-seg-listagem.component';

describe('CrudeCoberturaSegListagemComponent', () => {
  let component: CrudeCoberturaSegListagemComponent;
  let fixture: ComponentFixture<CrudeCoberturaSegListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCoberturaSegListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCoberturaSegListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
