import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegFormaCobListagemComponent } from './crude-prod-seg-forma-cob-listagem.component';

describe('CrudeProdSegFormaCobListagemComponent', () => {
  let component: CrudeProdSegFormaCobListagemComponent;
  let fixture: ComponentFixture<CrudeProdSegFormaCobListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegFormaCobListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegFormaCobListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
