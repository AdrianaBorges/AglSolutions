import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCondPagtoListagemComponent } from './crude-cond-pagto-listagem.component';

describe('CrudeCondPagtoListagemComponent', () => {
  let component: CrudeCondPagtoListagemComponent;
  let fixture: ComponentFixture<CrudeCondPagtoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCondPagtoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCondPagtoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
