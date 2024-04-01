import { Component } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatDialog} from "@angular/material/dialog";
import {OnboardingFeeService} from "../../services/onboarding-fee.service";
import {OnboardingFeeRequest} from "../../requests/onboarding-fee-request";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-onboarding-fee',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './create-onboarding-fee.component.html',
  styleUrl: './create-onboarding-fee.component.css'
})
export class CreateOnboardingFeeComponent {
  ofForm: FormGroup;
  request: OnboardingFeeRequest;

  constructor(public dialog: MatDialog,
              public router: Router,
              public toast: ToastrService,
              public onboardingFeeService: OnboardingFeeService) {
    this.ofForm = onboardingFeeService.ofForm;
  }

  createOnBoardingFee() {
    this.request = {
      id: this.ofForm.get('id').value,
      description: this.ofForm.get('description').value,
      amount: this.ofForm.get('amount').value
    }

    this.onboardingFeeService.update(this.request)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.toast.success(resp.description)
          this.closeDialog()

        }else {
          this.toast.error(resp.description)
        }
      })
  }

  closeDialog() {
    this.dialog.closeAll()
    this.ofForm.reset();
    window.location.reload();
  }
}
