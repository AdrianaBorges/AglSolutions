import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemSubsListagemComponent } from './crude-ass-tec-item-subs-listagem.component';

describe('CrudeAssTecItemSubsListagemComponent', () => {
  let component: CrudeAssTecItemSubsListagemComponent;
  let fixture: ComponentFixture<CrudeAssTecItemSubsListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemSubsListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemSubsListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
