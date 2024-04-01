import {Component, OnInit} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule, NgForOf} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {SavingPeriodRequest} from "../../requests/saving-period-request";
import {SavingPeriodService} from "../../services/saving-period.service";
import {ToastrService} from "ngx-toastr";
import {FiscalYearResponse} from "../../responses/fiscal-year-response";
import {FiscalYearService} from "../../services/fiscal-year.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-saving-period',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatLabel,
    MatOption,
    MatSelect,
    MatIcon,
    MatIconModule,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgForOf,
    MatSelectModule,
    MatIconButton
  ],
  templateUrl: './create-saving-period.component.html',
  styleUrl: './create-saving-period.component.css'
})
export class CreateSavingPeriodComponent implements OnInit {
  spForm: FormGroup;
  request: SavingPeriodRequest
  fiscalYears: FiscalYearResponse[];

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

  constructor(public dialog: MatDialog,
              public router: Router,
              public service: SavingPeriodService,
              public toastr: ToastrService,
              public fiscalYearService: FiscalYearService) {
    this.spForm = service.spForm
  }

  ngOnInit(): void {
        this.getAllFiscalYears();
    }

  getAllFiscalYears() {
    this.fiscalYearService.getAll()
      .subscribe((resp) => {
        this.fiscalYears = resp
      })
  }

  create() {
    this.request = {
      month: this.spForm.get('month').value,
      startsAt: this.spForm.get('startsAt').value,
      endsAt: this.spForm.get("endsAt").value,
      fiscalYear: this.spForm.get('fiscalYear').value
    }

    this.service.createSavingPeriod(this.request)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.toastr.success(resp.description)
          this.closeDialog()
          this.router.navigateByUrl("/saving-periods")
        }else {
          this.toastr.error(resp.description)
        }
      })
  }

  protected readonly close = close;

  closeDialog() {
    this.dialog.closeAll()
    window.location.reload()
    this.spForm.reset()
  }
}
