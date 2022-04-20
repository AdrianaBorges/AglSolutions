import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRegiaoListagemComponent } from './crude-regiao-listagem.component';

describe('CrudeRegiaoListagemComponent', () => {
  let component: CrudeRegiaoListagemComponent;
  let fixture: ComponentFixture<CrudeRegiaoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRegiaoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRegiaoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
