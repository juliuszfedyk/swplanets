import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsLoaderComponent } from './planets-loader.component';

describe('PlanetsLoaderComponent', () => {
  let component: PlanetsLoaderComponent;
  let fixture: ComponentFixture<PlanetsLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetsLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
