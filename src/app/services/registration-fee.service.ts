import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegistrationFeeResponse} from "../responses/registration-fee-response";
import {ApiConfigurationService} from "./api-configuration.service";
import {HttpService} from "./http-service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationFeeService extends HttpService{

  constructor(config: ApiConfigurationService,
              httpClient: HttpClient) {
    super(config, httpClient)

  }

  getAll(page: number, size: number): Observable<RegistrationFeeResponse[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('page', page)
    params = params.append('size', size)
    return this.httpClient.get<RegistrationFeeResponse[]>(this.rootUrl + "/registrationFee/all", {params})
  }
}
