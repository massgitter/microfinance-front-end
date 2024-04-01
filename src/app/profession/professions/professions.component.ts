import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {MatButton} from "@angular/material/button";
import {ProfessionService} from "../../services/profession.service";
import {ProfessionResponse} from "../../responses/profession-response";

@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrl: './professions.component.css',
  standalone: true,
    imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButton]
})
export class ProfessionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProfessionResponse>;
  professions: ProfessionResponse[] = [];
  dataSource = new MatTableDataSource<ProfessionResponse>(this.professions);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'description'];

  ngOnInit(): void {
    this.getAll()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  constructor(public professionService: ProfessionService) {
  }

  getAll() {
    this.professionService.getAll()
      .subscribe((resp) => {
        this.dataSource.data = resp
      })
  }

  openCreateProfession() {
    this.professionService.openCreateProfession()
  }

}
