import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProgramaListagemComponent } from './crude-programa-listagem.component';

describe('CrudeProgramaListagemComponent', () => {
  let component: CrudeProgramaListagemComponent;
  let fixture: ComponentFixture<CrudeProgramaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProgramaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProgramaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
