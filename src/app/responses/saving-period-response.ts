import {FiscalYearResponse} from "./fiscal-year-response";

export interface SavingPeriodResponse {
  id: number;
  month: string;
  startsAt: string;
  endsAt: string
  fiscalYearResponse: FiscalYearResponse
}
