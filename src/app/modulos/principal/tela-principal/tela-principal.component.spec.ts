import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TelaPrincipalComponent } from './tela-principal.component';

describe('TelaPrincipalComponent', () => {
  let component: TelaPrincipalComponent;
  let fixture: ComponentFixture<TelaPrincipalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
