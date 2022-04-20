import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegCoberturaListagemComponent } from './crude-prod-seg-cobertura-listagem.component';

describe('CrudeProdSegCoberturaListagemComponent', () => {
  let component: CrudeProdSegCoberturaListagemComponent;
  let fixture: ComponentFixture<CrudeProdSegCoberturaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegCoberturaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegCoberturaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
