import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CustomerService} from "../../services/customer.service";
import {ToastrService} from "ngx-toastr";
import {HttpResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-customer-import',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatIcon
  ],
  templateUrl: './customer-import.component.html',
  styleUrl: './customer-import.component.css'
})
export class CustomerImportComponent implements OnInit {
  uploadForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  loading = false;

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              public toast: ToastrService,
              public customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      uploadedFile: ['', Validators.required],
    });
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.customerService.import(this.currentFileUpload)
      .subscribe((resp) => {
        if (resp instanceof HttpResponse) {
          if (resp.ok === true) {
            if (resp.body.status) {
              this.toast.success(resp.body.description)
              this.uploadForm.reset();
              this.closeDialog()
            }else {
              this.toast.error(resp.body.description)
            }
          }else {
            this.toast.error("Please Upload valid File")
          }
        }
      })

    this.loading = false;
  }

  closeDialog() {
    this.dialog.closeAll()
    window.location.reload()
  }
}
