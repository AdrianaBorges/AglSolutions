import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeItemListagemComponent } from './crude-item-listagem.component';

describe('CrudeItemListagemComponent', () => {
  let component: CrudeItemListagemComponent;
  let fixture: ComponentFixture<CrudeItemListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeItemListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeItemListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
