import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateFiscalYearComponent} from "../create-fiscal-year/create-fiscal-year.component";
import {FiscalYearResponse} from "../../responses/fiscal-year-response";
import {FiscalYearService} from "../../services/fiscal-year.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-fiscal-years',
  templateUrl: './fiscal-years.component.html',
  styleUrl: './fiscal-years.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButton, MatIcon]
})
export class FiscalYearsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FiscalYearResponse>;
  responses: FiscalYearResponse[] = []
  dataSource = new MatTableDataSource<FiscalYearResponse>(this.responses);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'year', 'description', 'action'];

  constructor(public dialog: MatDialog,
              public fiscalYearService: FiscalYearService) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openCreateFiscalYear() {
    let dialogconfig: MatDialogConfig = new MatDialogConfig()
    dialogconfig.autoFocus = true;
    dialogconfig.disableClose = true;
    dialogconfig.height = "500px";
    dialogconfig.width = "50%";

    this.dialog.open(CreateFiscalYearComponent, dialogconfig);
    this.fiscalYearService.openCreateFiscalYear();
  }

  getAll() {
    this.fiscalYearService.getAll()
      .subscribe((resp) => {
        this.dataSource.data = resp
      })
  }

}
