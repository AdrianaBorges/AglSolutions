import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCtoCorSegListagemComponent } from './crude-cto-cor-seg-listagem.component';

describe('CrudeCtoCorSegListagemComponent', () => {
  let component: CrudeCtoCorSegListagemComponent;
  let fixture: ComponentFixture<CrudeCtoCorSegListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCtoCorSegListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCtoCorSegListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
