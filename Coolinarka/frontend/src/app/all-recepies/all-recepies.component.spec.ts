import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecepiesComponent } from './all-recepies.component';

describe('AllRecepiesComponent', () => {
  let component: AllRecepiesComponent;
  let fixture: ComponentFixture<AllRecepiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllRecepiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllRecepiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
