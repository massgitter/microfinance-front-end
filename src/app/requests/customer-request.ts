import {AddressRequest} from "./address-request";

export interface CustomerRequest {
  firstName: string;
  middleName: string;
  lastName: string;
  idCard: string;
  profession: string;
  arequest: AddressRequest
}
