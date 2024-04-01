import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SavingPeriodRequest} from "../requests/saving-period-request";
import {Observable} from "rxjs";
import {PersistenceResponse} from "../responses/persistence-response";
import {SavingPeriodResponse} from "../responses/saving-period-response";
import {FiscalYearResponse} from "../responses/fiscal-year-response";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateSavingPeriodComponent} from "../saving-period/create-saving-period/create-saving-period.component";
import {ApiConfigurationService} from "./api-configuration.service";
import {HttpService} from "./http-service";

@Injectable({
  providedIn: 'root'
})
export class SavingPeriodService extends HttpService {
  spForm: FormGroup;

  constructor(config: ApiConfigurationService,
              httpClient: HttpClient,
              public dialog: MatDialog) {
    super(config, httpClient)
    this.spForm = new FormGroup({
      month: new FormControl(),
      startsAt: new FormControl(),
      endsAt: new FormControl(),
      fiscalYear: new FormControl()
    })
  }

  openCreateSavingPeriod() {
    let dialogConfig: MatDialogConfig = new MatDialogConfig<any>()
    dialogConfig.height = "400px";
    dialogConfig.width = "25%"
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this.dialog.open(CreateSavingPeriodComponent, dialogConfig)
  }

  createSavingPeriod(request: SavingPeriodRequest): Observable<PersistenceResponse> {
    return this.httpClient.post<PersistenceResponse>(this.rootUrl + "/savingPeriod/create", request)

  }

  getAll(): Observable<SavingPeriodResponse[]> {
    return this.httpClient.get<SavingPeriodResponse[]>(this.rootUrl + "/savingPeriod/getAll")
  }

  findById(id: number): Observable<SavingPeriodResponse> {
    return this.httpClient.get<SavingPeriodResponse>(this.rootUrl +  "/savingPeriod/byId/" + id);
  }
}
