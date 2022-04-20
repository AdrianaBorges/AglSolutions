import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePaisListagemComponent } from './crude-pais-listagem.component';

describe('CrudePaisListagemComponent', () => {
  let component: CrudePaisListagemComponent;
  let fixture: ComponentFixture<CrudePaisListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePaisListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePaisListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
