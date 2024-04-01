import { Routes } from '@angular/router';
import {SavingPeriodsComponent} from "./saving-period/saving-periods/saving-periods.component";
import {FiscalYearsComponent} from "./fiscal-year/fiscal-years/fiscal-years.component";
import {CustomersComponent} from "./customer/customers/customers.component";
import {ProfessionsComponent} from "./profession/professions/professions.component";
import {RegistrationFeesComponent} from "./registrationfee/registration-fees/registration-fees.component";
import {OnboardingFeesComponent} from "./registrationfee/onboarding-fees/onboarding-fees.component";
import {SavingsComponent} from "./saving/savings/savings.component";

export const routes: Routes = [
  {path: 'saving-periods', component: SavingPeriodsComponent},
  {path: 'fiscal-years', component: FiscalYearsComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'profession', component: ProfessionsComponent},
  {path: 'registration-fees', component: RegistrationFeesComponent},
  {path: 'onboarding-fees', component: OnboardingFeesComponent},
  {path: 'savings', component: SavingsComponent}
];
