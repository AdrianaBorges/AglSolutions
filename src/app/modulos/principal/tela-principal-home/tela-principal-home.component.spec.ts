import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TelaPrincipalHomeComponent } from './tela-principal-home.component';

describe('TelaPrincipalHomeComponent', () => {
  let component: TelaPrincipalHomeComponent;
  let fixture: ComponentFixture<TelaPrincipalHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaPrincipalHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPrincipalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
