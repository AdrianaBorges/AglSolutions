import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProgramaNivelListagemComponent } from './crude-programa-nivel-listagem.component';

describe('CrudeProgramaNivelListagemComponent', () => {
  let component: CrudeProgramaNivelListagemComponent;
  let fixture: ComponentFixture<CrudeProgramaNivelListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProgramaNivelListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProgramaNivelListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
