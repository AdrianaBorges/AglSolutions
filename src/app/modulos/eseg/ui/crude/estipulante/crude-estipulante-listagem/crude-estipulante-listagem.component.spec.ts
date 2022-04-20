import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEstipulanteListagemComponent } from './crude-estipulante-listagem.component';

describe('CrudeEstipulanteListagemComponent', () => {
  let component: CrudeEstipulanteListagemComponent;
  let fixture: ComponentFixture<CrudeEstipulanteListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEstipulanteListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEstipulanteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
