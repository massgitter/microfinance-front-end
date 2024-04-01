import { Component } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {ProfessionService} from "../../services/profession.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-profession',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatIcon
  ],
  templateUrl: './create-profession.component.html',
  styleUrl: './create-profession.component.css'
})
export class CreateProfessionComponent {
  pForm: FormGroup
  description: string;

  constructor(public dialog: MatDialog,
              public toast: ToastrService,
              public professionService: ProfessionService) {
    this.pForm = professionService.pForm
  }

  closeDialog() {
    this.dialog.closeAll();
    window.location.reload();
    this.pForm.reset()
  }

  createProfession() {
    this.description = this.pForm.get('profession').value
    this.professionService.create(this.description)
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
