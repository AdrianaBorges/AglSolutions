import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AguardeCarregandoComponent } from './aguarde-carregando.component';

describe('AguardeCarregandoComponent', () => {
  let component: AguardeCarregandoComponent;
  let fixture: ComponentFixture<AguardeCarregandoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AguardeCarregandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AguardeCarregandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
