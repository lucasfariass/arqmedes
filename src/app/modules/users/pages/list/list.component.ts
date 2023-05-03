import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { PreviewUserComponent } from '../../components/preview-user/preview-user.component';
import { UserService } from '../../services/user.service';
import { IUser } from './../../models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'name',
    'cpf',
    'profession',
    'birthDate',
    'civilStatus',
    'city',
    'uf',
    'actions',
  ];
  dataSource: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filter: FormControl = new FormControl();
  subscription: Subscription;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsersPage();
    this.search();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search() {
    this.subscription = this.filter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value.toLowerCase().trim();
    });
  }

  loadUsersPage() {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource<IUser>(users);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }

  openPreviewDialog(user: IUser) {
    const dialogRef = this.dialog.open(PreviewUserComponent, {
      width: '800px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  private deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.snackBar.open('Usuário excluido com sucesso!', 'OK');
      this.loadUsersPage();
    });
  }
}
