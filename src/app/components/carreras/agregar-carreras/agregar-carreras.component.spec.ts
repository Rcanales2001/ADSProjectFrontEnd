import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCarrerasComponent } from './agregar-carreras.component';

describe('AgregarCarrerasComponent', () => {
  let component: AgregarCarrerasComponent;
  let fixture: ComponentFixture<AgregarCarrerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCarrerasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
