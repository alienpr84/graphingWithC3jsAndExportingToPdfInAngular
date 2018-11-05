import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaAnualComponent } from './venta-anual.component';

describe('VentaAnualComponent', () => {
  let component: VentaAnualComponent;
  let fixture: ComponentFixture<VentaAnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaAnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
