import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FiscalYearRequest} from "../../requests/fiscal-year-request";
import {FiscalYearService} from "../../services/fiscal-year.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-fiscal-year',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './create-fiscal-year.component.html',
  styleUrl: './create-fiscal-year.component.css'
})
export class CreateFiscalYearComponent {
  fyForm: FormGroup;
  request: FiscalYearRequest
  months: string[] = [
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST'

  ]
  years: number[] = [
    2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2027,2028,2029
  ];
  days: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

  constructor(public dialog: MatDialog,
              public toast: ToastrService,
              public fiscalYearService: FiscalYearService) {
    this.fyForm = fiscalYearService.fyForm;
  }

  closeDialog() {
    this.dialog.closeAll();
    window.location.reload();
    this.fyForm.reset()
  }

  create() {
    this.request = {
      year: this.fyForm.get('year').value,
      description: this.fyForm.get('description').value,
      startingMonth: this.fyForm.get('startingMonth').value,
      paymentStartsAt: this.fyForm.get('paymentStartsAt').value,
      paymentActiveFor: this.fyForm.get('paymentActiveFor').value,
      startsAt: this.fyForm.get('startsAt').value,
      endsAt: this.fyForm.get('endsAt').value
    }

    this.fiscalYearService.create(this.request)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.toast.success(resp.description)
          this.closeDialog()
        }else {
          this.toast.error(resp.description)
        }
      })

  }
}
