import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsuAlterarSenhaComponent } from './usu-alterar-senha.component';

describe('UsuAlterarSenhaComponent', () => {
  let component: UsuAlterarSenhaComponent;
  let fixture: ComponentFixture<UsuAlterarSenhaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuAlterarSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuAlterarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
