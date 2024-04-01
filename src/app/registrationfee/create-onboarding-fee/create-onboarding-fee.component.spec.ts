import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOnboardingFeeComponent } from './create-onboarding-fee.component';

describe('CreateOnboardingFeeComponent', () => {
  let component: CreateOnboardingFeeComponent;
  let fixture: ComponentFixture<CreateOnboardingFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOnboardingFeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOnboardingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
