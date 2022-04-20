import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegAssistListagemComponent } from './crude-prod-seg-assist-listagem.component';

describe('CrudeProdSegAssistListagemComponent', () => {
  let component: CrudeProdSegAssistListagemComponent;
  let fixture: ComponentFixture<CrudeProdSegAssistListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegAssistListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegAssistListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
