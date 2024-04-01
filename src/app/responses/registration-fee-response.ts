import {CustomerResponse} from "./customer-response";

export interface RegistrationFeeResponse {
  id: number;
  customerResponse: CustomerResponse;
  amount: number;
  status: string;
}
