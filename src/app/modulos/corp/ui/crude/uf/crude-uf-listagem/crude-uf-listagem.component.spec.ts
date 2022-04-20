import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeUfListagemComponent } from './crude-uf-listagem.component';

describe('CrudeUfListagemComponent', () => {
  let component: CrudeUfListagemComponent;
  let fixture: ComponentFixture<CrudeUfListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeUfListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeUfListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
