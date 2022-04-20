import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeFamMatListagemComponent } from './crude-fam-mat-listagem.component';

describe('CrudeFamMatListagemComponent', () => {
  let component: CrudeFamMatListagemComponent;
  let fixture: ComponentFixture<CrudeFamMatListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeFamMatListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeFamMatListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
