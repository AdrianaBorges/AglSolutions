import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTranspListagemComponent } from './crude-transp-listagem.component';

describe('CrudeTranspListagemComponent', () => {
  let component: CrudeTranspListagemComponent;
  let fixture: ComponentFixture<CrudeTranspListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTranspListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTranspListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
