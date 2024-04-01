import {HttpClient, HttpParameterCodec, HttpParams} from "@angular/common/http";
import {ApiConfigurationService} from "./api-configuration.service";

class ParameterCodec implements HttpParameterCodec {
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }

  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

}

const  PARAMETER_CODEC = new ParameterCodec();

export class HttpService {

  constructor(protected config: ApiConfigurationService,
              protected httpClient: HttpClient) {
  }

  private _root_url: string = '';

  get rootUrl(): string {
    return this._root_url || this.config.rootUrl;
}
  set rootUrl(rootUrl: string) {
    this._root_url = rootUrl;
  }

  protected newParams(): HttpParams {
    return new HttpParams({
      encoder: PARAMETER_CODEC
    })
  }
}
