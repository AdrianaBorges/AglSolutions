import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemServListagemComponent } from './crude-ass-tec-item-serv-listagem.component';

describe('CrudeAssTecItemServListagemComponent', () => {
  let component: CrudeAssTecItemServListagemComponent;
  let fixture: ComponentFixture<CrudeAssTecItemServListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemServListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemServListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
