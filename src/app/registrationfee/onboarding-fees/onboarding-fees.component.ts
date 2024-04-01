import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {OnBoardingFeeResponse} from "../../responses/on-boarding-fee-response";
import {OnboardingFeeService} from "../../services/onboarding-fee.service";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-onboarding-fees',
  templateUrl: './onboarding-fees.component.html',
  styleUrl: './onboarding-fees.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButton, MatIcon]
})
export class OnboardingFeesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<OnBoardingFeeResponse>;
  onboardingFees: OnBoardingFeeResponse[] =[];
  dataSource = new MatTableDataSource<OnBoardingFeeResponse>(this.onboardingFees);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'description', 'amount', 'action'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  constructor(public onboardingFeeService: OnboardingFeeService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.onboardingFeeService.getAll()
      .subscribe((resp) => {
        this.dataSource.data = resp
      })
  }

  edit(id: number) {
    this.onboardingFeeService.byId(id)
      .subscribe((resp) => {
        this.onboardingFeeService.ofForm = new FormGroup({
          id: new FormControl(resp.id),
          description: new FormControl(resp.description),
          amount: new FormControl(resp.amount)
        })

        this.onboardingFeeService.openCreateOnboardingFee()
      })

  }
}
