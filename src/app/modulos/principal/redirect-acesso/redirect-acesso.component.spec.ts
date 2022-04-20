import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RedirectAcessoComponent } from './redirect-acesso.component';

describe('RedirectAcessoComponent', () => {
  let component: RedirectAcessoComponent;
  let fixture: ComponentFixture<RedirectAcessoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
