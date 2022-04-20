import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlterarSenhaComponent } from './alterar-senha.component';

describe('AlterarSenhaComponent', () => {
  let component: AlterarSenhaComponent;
  let fixture: ComponentFixture<AlterarSenhaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
