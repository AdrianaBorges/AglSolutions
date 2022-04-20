import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPapelListagemComponent } from './crude-tipo-papel-listagem.component';

describe('CrudeTipoPapelListagemComponent', () => {
  let component: CrudeTipoPapelListagemComponent;
  let fixture: ComponentFixture<CrudeTipoPapelListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPapelListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPapelListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
