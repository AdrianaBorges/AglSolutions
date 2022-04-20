import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProdSegValorListagemComponent } from './crude-prod-seg-valor-listagem.component';

describe('CrudeProdSegValorListagemComponent', () => {
  let component: CrudeProdSegValorListagemComponent;
  let fixture: ComponentFixture<CrudeProdSegValorListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProdSegValorListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProdSegValorListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
