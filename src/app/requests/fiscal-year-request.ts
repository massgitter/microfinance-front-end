export interface FiscalYearRequest {
  year: number;
  description: string
  startingMonth: string
  paymentStartsAt: number;
  paymentActiveFor: number;
  startsAt: Date
  endsAt: Date
}
