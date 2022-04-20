import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeNfeListagemComponent } from './crude-nfe-listagem.component';

describe('CrudeNfeListagemComponent', () => {
  let component: CrudeNfeListagemComponent;
  let fixture: ComponentFixture<CrudeNfeListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeNfeListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeNfeListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
