import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CustomerService} from "../../services/customer.service";
import {CustomerRequest} from "../../requests/customer-request";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {ProfessionResponse} from "../../responses/profession-response";
import {ProfessionService} from "../../services/profession.service";

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgForOf,
    ReactiveFormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    NgIf
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent implements OnInit {
  customerForm: FormGroup;
  request: CustomerRequest;
  professions: ProfessionResponse[];

  constructor(public dialog: MatDialog,
              public router: Router,
              public toast: ToastrService,
              public customerService: CustomerService,
              public professionService: ProfessionService) {
    this.customerForm = customerService.customerForm
  }

  ngOnInit(): void {
    this.getAllProfessions()
  }

  closeDialog() {
    this.dialog.closeAll()
    window.location.reload();
    this.customerForm.reset()

  }

  getAllProfessions() {
    this.professionService.getAll()
      .subscribe((resp) => {
        this.professions = resp
      })
  }

  create() {
    this.request = {
      firstName: this.customerForm.get('firstName').value,
      middleName: this.customerForm.get('middleName').value,
      lastName: this.customerForm.get('lastName').value,
      idCard: this.customerForm.get('idCard').value,
      profession: this.customerForm.get('profession').value,
      arequest: {
        city: this.customerForm.get('city').value,
        woreda: this.customerForm.get('woreda').value,
        kebele: this.customerForm.get('kebele').value,
        phone: this.customerForm.get('phone').value
      }
    }


    this.customerService.createCustomer(this.request)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.toast.success(resp.description)
          this.closeDialog()
          this.router.navigateByUrl('/customers')
        }else {
          this.toast.error(resp.description)
          this.router.navigateByUrl('/customers')
        }
      })

  }

}
