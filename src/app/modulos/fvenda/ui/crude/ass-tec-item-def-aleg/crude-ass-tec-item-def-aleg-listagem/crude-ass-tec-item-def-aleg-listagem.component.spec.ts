import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemDefAlegListagemComponent } from './crude-ass-tec-item-def-aleg-listagem.component';

describe('CrudeAssTecItemDefAlegListagemComponent', () => {
  let component: CrudeAssTecItemDefAlegListagemComponent;
  let fixture: ComponentFixture<CrudeAssTecItemDefAlegListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemDefAlegListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemDefAlegListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
