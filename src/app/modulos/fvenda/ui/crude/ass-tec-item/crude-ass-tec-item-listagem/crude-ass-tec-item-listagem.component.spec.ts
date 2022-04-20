import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecItemListagemComponent } from './crude-ass-tec-item-listagem.component';

describe('CrudeAssTecItemListagemComponent', () => {
  let component: CrudeAssTecItemListagemComponent;
  let fixture: ComponentFixture<CrudeAssTecItemListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecItemListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecItemListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
