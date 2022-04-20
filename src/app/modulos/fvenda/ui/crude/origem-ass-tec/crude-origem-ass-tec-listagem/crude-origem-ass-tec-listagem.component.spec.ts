import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeOrigemAssTecListagemComponent } from './crude-origem-ass-tec-listagem.component';

describe('CrudeOrigemAssTecListagemComponent', () => {
  let component: CrudeOrigemAssTecListagemComponent;
  let fixture: ComponentFixture<CrudeOrigemAssTecListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeOrigemAssTecListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeOrigemAssTecListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
