import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSeguradoListagemComponent } from './crude-segurado-listagem.component';

describe('CrudeSeguradoListagemComponent', () => {
  let component: CrudeSeguradoListagemComponent;
  let fixture: ComponentFixture<CrudeSeguradoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSeguradoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSeguradoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
