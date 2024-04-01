import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {RegistrationFeeResponse} from "../../responses/registration-fee-response";
import {RegistrationFeeService} from "../../services/registration-fee.service";

@Component({
  selector: 'app-registration-fees',
  templateUrl: './registration-fees.component.html',
  styleUrl: './registration-fees.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class RegistrationFeesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RegistrationFeeResponse>;
  registrationFees: RegistrationFeeResponse[] = []
  dataSource = new MatTableDataSource<RegistrationFeeResponse>(this.registrationFees);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'middleName', 'lastName', 'idCard', 'amount', 'status'];

  constructor(public registrationFeeService: RegistrationFeeService) {
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.registrationFeeService.getAll(1, 5000)
      .subscribe((resp) => {
        this.dataSource.data = resp
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


}
