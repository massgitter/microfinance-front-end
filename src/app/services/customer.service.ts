import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from "@angular/common/http";
import {CreateSavingPeriodComponent} from "../saving-period/create-saving-period/create-saving-period.component";
import {CreateCustomerComponent} from "../customer/create-customer/create-customer.component";
import {FormControl, FormGroup} from "@angular/forms";
import {filter, Observable} from "rxjs";
import {PersistenceResponse} from "../responses/persistence-response";
import {CustomerRequest} from "../requests/customer-request";
import {CustomerResponse} from "../responses/customer-response";
import {HttpService} from "./http-service";
import {ApiConfigurationService} from "./api-configuration.service";
import {CustomerImportComponent} from "../customer/customer-import/customer-import.component";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends HttpService {
  customerForm: FormGroup;

  constructor(config: ApiConfigurationService,
              httpClient: HttpClient,
              public dialog: MatDialog
             ) {
    super(config, httpClient)

    this.customerForm = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl(),
      middleName: new FormControl(),
      lastName: new FormControl(),
      idCard: new FormControl(),
      profession: new FormControl(),
      city: new FormControl(),
      woreda: new FormControl(),
      kebele: new FormControl(),
      phone: new FormControl()
    })
  }

  openCreateCustomer() {
    let dialogConfig: MatDialogConfig = new MatDialogConfig<any>()
    dialogConfig.height = "450px";
    dialogConfig.width = "50%"
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this.dialog.open(CreateCustomerComponent, dialogConfig)
  }

  openImportCustomers() {
    let dialogConfig: MatDialogConfig = new MatDialogConfig<any>()
    dialogConfig.autoFocus=true
    dialogConfig.disableClose=true
    dialogConfig.height='25%'
    dialogConfig.width='30%'

    this.dialog.open(CustomerImportComponent, dialogConfig)
  }

  import(file: File): Observable<HttpEvent<PersistenceResponse>> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("fileType", file.type)

    const request: HttpRequest<FormData> = new HttpRequest<FormData>('POST',
      this.rootUrl + '/customer/import', formData, {reportProgress: true, responseType: "json"})
    return this.httpClient.request(request)
  }

  createCustomer(request: CustomerRequest): Observable<PersistenceResponse> {
    return this.httpClient.post<PersistenceResponse>( this.rootUrl + "/customer/register", request)
  }

  getAll(page: number, size: number): Observable<CustomerResponse[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    return this.httpClient.get<CustomerResponse[]>(this.rootUrl + "/customer/all", {params})
  }

  findById(id: number): Observable<CustomerResponse> {
    return this.httpClient.get<CustomerResponse>(this.rootUrl +  "/customer/byId/" + id)

  }

  countOfCustomers(): Observable<number> {
    return this.httpClient.get<number>(this.rootUrl + '/customer/count')
  }

}
