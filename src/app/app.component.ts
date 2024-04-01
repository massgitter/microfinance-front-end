import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CreateSavingPeriodComponent} from "./saving-period/create-saving-period/create-saving-period.component";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SavingPeriodsComponent} from "./saving-period/saving-periods/saving-periods.component";
import {SideNavComponent} from "./side-nav/side-nav/side-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CreateSavingPeriodComponent,
    MatButton,
    SavingPeriodsComponent,
    SideNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'microfinance';

  constructor(public dialog: MatDialog) {
  }

}
