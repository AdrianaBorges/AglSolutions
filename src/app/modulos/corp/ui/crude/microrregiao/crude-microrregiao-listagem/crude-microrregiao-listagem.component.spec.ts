import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeMicrorregiaoListagemComponent } from './crude-microrregiao-listagem.component';

describe('CrudeMicrorregiaoListagemComponent', () => {
  let component: CrudeMicrorregiaoListagemComponent;
  let fixture: ComponentFixture<CrudeMicrorregiaoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeMicrorregiaoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeMicrorregiaoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
