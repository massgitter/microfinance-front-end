import {AddressResponse} from "./address-response";
import {ProfessionResponse} from "./profession-response";

export interface CustomerResponse {
  id: number
  firstName: string;
  middleName: string;
  lastName: string;
  idCard: string;
  status: string;
  presponse: ProfessionResponse
  aresponse: AddressResponse;
}
