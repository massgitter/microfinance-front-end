import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FiscalYearResponse} from "../responses/fiscal-year-response";
import {FiscalYearRequest} from "../requests/fiscal-year-request";
import {PersistenceResponse} from "../responses/persistence-response";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateFiscalYearComponent} from "../fiscal-year/create-fiscal-year/create-fiscal-year.component";
import {HttpService} from "./http-service";
import {ApiConfigurationService} from "./api-configuration.service";

@Injectable({
  providedIn: 'root'
})
export class FiscalYearService extends HttpService{
  fyForm: FormGroup

  constructor(config: ApiConfigurationService,
              httpClient: HttpClient,
              public dialog: MatDialog) {
    super(config, httpClient)
    this.fyForm = new FormGroup<any>({
      description: new FormControl(),
      startingMonth: new FormControl(),
      paymentStartsAt: new FormControl(),
      paymentActiveFor: new FormControl(),
      year: new FormControl(),
      startsAt: new FormControl(),
      endsAt: new FormControl
    })
  }

  openCreateFiscalYear() {
    let dialogconfig: MatDialogConfig = new MatDialogConfig()
    dialogconfig.autoFocus = true;
    dialogconfig.disableClose = true;
    dialogconfig.height = '500px';
    dialogconfig.width = '50%'
    this.dialog.open(CreateFiscalYearComponent, dialogconfig);

  }

  create(request: FiscalYearRequest): Observable<PersistenceResponse> {
    return this.httpClient.post<PersistenceResponse>(this.rootUrl + "/fiscalYear/save", request)
  }
  getAll(): Observable<FiscalYearResponse[]> {
    return this.httpClient.get<FiscalYearResponse[]>(this.rootUrl + "/fiscalYear/all")
  }
}
