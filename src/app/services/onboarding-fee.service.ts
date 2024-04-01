import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OnBoardingFeeResponse} from "../responses/on-boarding-fee-response";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateCustomerComponent} from "../customer/create-customer/create-customer.component";
import {CreateOnboardingFeeComponent} from "../registrationfee/create-onboarding-fee/create-onboarding-fee.component";
import {FormControl, FormGroup} from "@angular/forms";
import {OnboardingFeeRequest} from "../requests/onboarding-fee-request";
import {PersistenceResponse} from "../responses/persistence-response";
import {HttpService} from "./http-service";
import {ApiConfigurationService} from "./api-configuration.service";

@Injectable({
  providedIn: 'root'
})
export class OnboardingFeeService extends HttpService {
  ofForm: FormGroup;

  constructor(config: ApiConfigurationService,
              httpClient: HttpClient,
              public dialog: MatDialog) {
    super(config, httpClient)
    this.ofForm = new FormGroup({
      id: new FormControl(),
      description: new FormControl(),
      amount: new FormControl()
    })

  }

  openCreateOnboardingFee() {
    let dialogConfig: MatDialogConfig = new MatDialogConfig<any>()
    dialogConfig.height = "250px";
    dialogConfig.width = "35%"
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this.dialog.open(CreateOnboardingFeeComponent, dialogConfig)
  }

  create(request: OnboardingFeeRequest): Observable<PersistenceResponse> {
    return this.httpClient.post<PersistenceResponse>(this.rootUrl + "/onboardingFee/create", request);
  }

  update(request: OnboardingFeeRequest): Observable<PersistenceResponse> {
    return this.httpClient.put<PersistenceResponse>(this.rootUrl + "/onboardingFee/edit", request);
  }
  getAll(): Observable<OnBoardingFeeResponse[]> {
    return this.httpClient.get<OnBoardingFeeResponse[]>(this.rootUrl +  "/onboardingFee/all")
  }

  byId(id: number): Observable<OnBoardingFeeResponse> {
    return this.httpClient.get<OnBoardingFeeResponse>(this.rootUrl + "/onboardingFee/byId/" + id)

  }
}
