import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {MatButton} from "@angular/material/button";
import {CustomerService} from "../../services/customer.service";
import {CustomerResponse} from "../../responses/customer-response";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {FormControl, FormGroup} from "@angular/forms";
import {tap} from "rxjs";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButton,
    NgIf,
    MatIcon,
    MatButtonToggle]
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CustomerResponse>;
  responses: CustomerResponse[] = [];
  dataSource = new MatTableDataSource<CustomerResponse>(this.responses)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'middleName', 'lastName', 'idCard', 'phone', 'status', 'action'];
  totalItems: number;

  constructor(public customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.countOfCustomers();
    this.getAll()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource
  }

  openCreateCustomer() {
    this.customerService.openCreateCustomer()

  }

  countOfCustomers() {
    this.customerService.countOfCustomers()
      .subscribe((resp) => {
        this.totalItems = resp
      })
  }

  public getAll() {
    this.customerService.getAll(1, 1000)
      .subscribe((resp) => {
        this.dataSource.data = resp
      })

  }

  openEditCustomer(id: number) {
    this.customerService.findById(id)
      .subscribe((resp) => {
        this.customerService.customerForm = new FormGroup({
          id: new FormControl(resp.id),
          firstName: new FormControl(resp.firstName),
          middleName: new FormControl(resp.middleName),
          lastName: new FormControl(resp.lastName),
          idCard: new FormControl(resp.id),
          profession: new FormControl(resp.presponse.description),
          city: new FormControl(resp.aresponse.city),
          woreda: new FormControl(resp.aresponse.woreda),
          kebele: new FormControl(resp.aresponse.kebele),
          phone: new FormControl(resp.aresponse.phone)
        })

        this.customerService.openCreateCustomer()
      })

  }

  openImportCustomers() {
    this.customerService.openImportCustomers()
  }

}
