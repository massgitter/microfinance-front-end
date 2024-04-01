import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {SavingResponse} from "../../responses/saving-response";
import {MatList, MatListItem} from "@angular/material/list";
import {SavingService} from "../../services/saving.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatList, MatListItem, MatFormField, MatInput, MatLabel, MatIcon, MatButton]
})
export class SavingsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SavingResponse>;
  responses: SavingResponse[] = [];
  dataSource = new MatTableDataSource<SavingResponse>(this.responses);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'customer', 'customerId', 'description', 'totalAmount', 'month', 'action'];

  constructor(private savingService: SavingService) {
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit() {
    this.getAll()
  }

  private getAll() {
    this.savingService.getAll()
      .subscribe((resp) => {
        this.dataSource.data = resp;
      })
  }

  openGenerateSaving() {
    this.savingService.openGenerateSaving()
  }
}
