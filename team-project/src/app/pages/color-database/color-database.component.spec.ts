import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDatabaseComponent } from './color-database.component';

describe('ColorDatabaseComponent', () => {
  let component: ColorDatabaseComponent;
  let fixture: ComponentFixture<ColorDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
