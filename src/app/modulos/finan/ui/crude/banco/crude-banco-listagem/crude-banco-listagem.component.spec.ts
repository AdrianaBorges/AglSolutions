import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeBancoListagemComponent } from './crude-banco-listagem.component';

describe('CrudeBancoListagemComponent', () => {
  let component: CrudeBancoListagemComponent;
  let fixture: ComponentFixture<CrudeBancoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeBancoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeBancoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
