import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeFamComListagemComponent } from './crude-fam-com-listagem.component';

describe('CrudeFamComListagemComponent', () => {
  let component: CrudeFamComListagemComponent;
  let fixture: ComponentFixture<CrudeFamComListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeFamComListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeFamComListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
