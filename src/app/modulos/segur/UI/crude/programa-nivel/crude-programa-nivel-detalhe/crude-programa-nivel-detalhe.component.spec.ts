import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProgramaNivelDetalheComponent } from './crude-programa-nivel-detalhe.component';

describe('CrudeProgramaNivelDetalheComponent', () => {
  let component: CrudeProgramaNivelDetalheComponent;
  let fixture: ComponentFixture<CrudeProgramaNivelDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProgramaNivelDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProgramaNivelDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
