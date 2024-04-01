import {CustomerResponse} from "./customer-response";
import {SavingPeriodResponse} from "./saving-period-response";

export interface SavingResponse {
  id: number;
  description: string;
  amountDuty: number;
  overDuty: number;
  penalty: number;
  totalAmount: number;
  status: string;
  customerResponse: CustomerResponse;
  savingPeriodResponse: SavingPeriodResponse
}
