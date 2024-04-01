import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SavingResponse} from "../responses/saving-response";
import {HttpService} from "./http-service";
import {ApiConfigurationService} from "./api-configuration.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {GenerateSavingComponent} from "../saving/generate-saving/generate-saving.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersistenceResponse} from "../responses/persistence-response";

@Injectable({
  providedIn: 'root'
})
export class SavingService extends HttpService {
  savingForm: FormGroup;

  constructor(config: ApiConfigurationService,
              httpClient: HttpClient,
              private dialog: MatDialog) {
    super(config, httpClient)

    this.savingForm = new FormGroup<any>({
      id: new FormControl(),
      month: new FormControl(Validators.required),
      amount: new FormControl()
    })
  }

  getAll(): Observable<SavingResponse[]> {
    return this.httpClient.get<SavingResponse[]>(this.rootUrl + "/savings/all")
  }

  openGenerateSaving() {
    let dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '40%'
    dialogConfig.width = '35%'

    this.dialog.open(GenerateSavingComponent, dialogConfig)
  }

  generate(month: number, amount: number): Observable<PersistenceResponse> {
    let params: HttpParams = new HttpParams()
    params = params.append("month", month)
    params = params.append("amount", amount)

    return this.httpClient.post<PersistenceResponse>(this.rootUrl + "/savings/generate", params)

  }
}
