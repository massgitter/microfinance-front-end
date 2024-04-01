import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSavingPeriodComponent } from './create-saving-period.component';

describe('CreateSavingPeriodComponent', () => {
  let component: CreateSavingPeriodComponent;
  let fixture: ComponentFixture<CreateSavingPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSavingPeriodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSavingPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
