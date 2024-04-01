import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSavingComponent } from './generate-saving.component';

describe('GenerateSavingComponent', () => {
  let component: GenerateSavingComponent;
  let fixture: ComponentFixture<GenerateSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateSavingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
