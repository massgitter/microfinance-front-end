import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {SavingPeriodResponse} from "../../responses/saving-period-response";
import {SavingPeriodService} from "../../services/saving-period.service";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateSavingPeriodComponent} from "../create-saving-period/create-saving-period.component";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-saving-periods',
  templateUrl: './saving-periods.component.html',
  styleUrl: './saving-periods.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButton, MatIcon]
})
export class SavingPeriodsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SavingPeriodResponse>;
  savingPeriodResponse: SavingPeriodResponse[] = [];
  dataSource = new MatTableDataSource<SavingPeriodResponse>(this.savingPeriodResponse);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'month', 'startsAt', 'endsAt', 'fiscalYear', 'action'];

  constructor(public dialog: MatDialog,
              public savingPeriodService: SavingPeriodService) {
  }

  openCreateSavingPeriod() {
    this.savingPeriodService.openCreateSavingPeriod()
  }
  getAll() {
    this.savingPeriodService.getAll()
      .subscribe((resp) => {
        this.dataSource.data = resp as SavingPeriodResponse[]
        console.log("This datasource is " + this.dataSource.data)
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.getAll()
  }

  openEditSavingPeriod(id: number) {
    this.savingPeriodService.findById(id)
      .subscribe((resp) => {
        this.savingPeriodService.spForm = new FormGroup({
          month: new FormControl(resp.month),
          startsAt: new FormControl(resp.startsAt),
          endsAt: new FormControl(resp.endsAt),
          fiscalYear: new FormControl(resp.fiscalYearResponse.id)
        })
        this.savingPeriodService.openCreateSavingPeriod()
      })

  }
}
