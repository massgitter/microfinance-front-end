import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SavingService} from "../../services/saving.service";
import {SavingPeriodResponse} from "../../responses/saving-period-response";
import {SavingPeriodService} from "../../services/saving-period.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-generate-saving',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './generate-saving.component.html',
  styleUrl: './generate-saving.component.css'
})
export class GenerateSavingComponent implements OnInit {
  savingForm: FormGroup;
  months: SavingPeriodResponse[]

  constructor(private dialog: MatDialog,
              private toast: ToastrService,
              private savingService: SavingService,
              private savingPeriodService: SavingPeriodService) {
    this.savingForm = savingService.savingForm
  }

  ngOnInit(): void {
    this.getAllPeriods()
  }

  getAllPeriods() {
    this.savingPeriodService.getAll()
      .subscribe((resp) => {
        this.months = resp
      })
  }

  closeDialog() {
    this.dialog.closeAll()
    window.location.reload()
  }

  generate() {
    this.savingService.generate(
      this.savingForm.get('month').value,
      this.savingForm.get('amount').value)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.toast.success(resp.description)
          this.closeDialog();
        }else {
          this.toast.error(resp.description)
        }
      })
  }
}
