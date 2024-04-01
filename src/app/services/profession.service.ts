import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfessionResponse} from "../responses/profession-response";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateCustomerComponent} from "../customer/create-customer/create-customer.component";
import {CreateProfessionComponent} from "../profession/create-profession/create-profession.component";
import {FormControl, FormGroup} from "@angular/forms";
import {PersistenceResponse} from "../responses/persistence-response";
import {ApiConfigurationService} from "./api-configuration.service";
import {HttpService} from "./http-service";

@Injectable({
  providedIn: 'root'
})
export class ProfessionService extends HttpService {
  pForm: FormGroup

  constructor(config: ApiConfigurationService,
              httpClient: HttpClient,
              public dialog: MatDialog) {
    super(config, httpClient)
    this.pForm = new FormGroup({
      profession: new FormControl()
    })
  }

  openCreateProfession() {
    let dialogConfig: MatDialogConfig = new MatDialogConfig<any>()
    dialogConfig.height = "160px";
    dialogConfig.width = "35%"
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this.dialog.open(CreateProfessionComponent, dialogConfig)
  }
  create(description: string): Observable<PersistenceResponse>{
    return  this.httpClient.post<PersistenceResponse>(this.rootUrl + "/profession/create", description)
  }

  byDescription(description: string): Observable<ProfessionResponse> {
    return this.httpClient.get<ProfessionResponse>(this.rootUrl + "/profession/byDescrption/" + description)
  }

  getAll(): Observable<ProfessionResponse[]> {
    return this.httpClient.get<ProfessionResponse[]>(this.rootUrl + "/profession/all")
  }

}
