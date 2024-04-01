import {ApplicationConfig, NgModule} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideToastr} from "ngx-toastr";
import {provideNativeDateAdapter} from "@angular/material/core";
import {provideAnimations, provideNoopAnimations} from "@angular/platform-browser/animations";

export const appConfig:
  ApplicationConfig = {
  providers:[
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideToastr(),
    provideNoopAnimations(),
    provideAnimations(),
    provideNativeDateAdapter(),
  ]
};
