import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSexoListagemComponent } from './crude-sexo-listagem.component';

describe('CrudeSexoListagemComponent', () => {
  let component: CrudeSexoListagemComponent;
  let fixture: ComponentFixture<CrudeSexoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSexoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSexoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
