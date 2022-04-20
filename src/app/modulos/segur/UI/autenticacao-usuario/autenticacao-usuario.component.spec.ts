import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutenticacaoUsuarioComponent } from './autenticacao-usuario.component';

describe('AutenticacaoUsuarioComponent', () => {
  let component: AutenticacaoUsuarioComponent;
  let fixture: ComponentFixture<AutenticacaoUsuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticacaoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
