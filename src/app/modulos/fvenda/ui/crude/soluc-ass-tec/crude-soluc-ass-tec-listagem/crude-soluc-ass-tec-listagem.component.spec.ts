import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSolucAssTecListagemComponent } from './crude-soluc-ass-tec-listagem.component';

describe('CrudeSolucAssTecListagemComponent', () => {
  let component: CrudeSolucAssTecListagemComponent;
  let fixture: ComponentFixture<CrudeSolucAssTecListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSolucAssTecListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSolucAssTecListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
