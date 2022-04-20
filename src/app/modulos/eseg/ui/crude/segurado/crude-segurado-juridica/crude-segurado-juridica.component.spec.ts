import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSeguradoJuridicaComponent } from './crude-segurado-juridica.component';

describe('CrudeSeguradoJuridicaComponent', () => {
  let component: CrudeSeguradoJuridicaComponent;
  let fixture: ComponentFixture<CrudeSeguradoJuridicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSeguradoJuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSeguradoJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
