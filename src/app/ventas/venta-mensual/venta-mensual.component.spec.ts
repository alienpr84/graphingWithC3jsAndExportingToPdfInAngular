import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaMensualComponent } from './venta-mensual.component';

describe('VentaMensualComponent', () => {
  let component: VentaMensualComponent;
  let fixture: ComponentFixture<VentaMensualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaMensualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
