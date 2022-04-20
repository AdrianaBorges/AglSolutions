import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCategoriaListagemComponent } from './crude-categoria-listagem.component';

describe('CrudeCategoriaListagemComponent', () => {
  let component: CrudeCategoriaListagemComponent;
  let fixture: ComponentFixture<CrudeCategoriaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCategoriaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCategoriaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
