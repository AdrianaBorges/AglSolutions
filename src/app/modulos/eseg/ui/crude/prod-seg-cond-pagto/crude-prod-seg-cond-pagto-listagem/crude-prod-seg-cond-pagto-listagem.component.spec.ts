import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegCondPagtoListagemComponent } from './crude-prod-seg-cond-pagto-listagem.component';

describe('CrudeProdSegCondPagtoListagemComponent', () => {
  let component: CrudeProdSegCondPagtoListagemComponent;
  let fixture: ComponentFixture<CrudeProdSegCondPagtoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegCondPagtoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegCondPagtoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
