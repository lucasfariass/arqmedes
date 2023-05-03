import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { UserService } from '../../services/user.service';
import { ConfirmationDialogModule } from './../../components/confirmation-dialog/confirmation-dialog.module';
import { PreviewUserModule } from './../../components/preview-user/preview-user.module';
import { ListComponent } from './list.component';
import { CivilStatusModule } from './../../pipes/civil-status/civil-status.module';

const routes: Routes = [{ path: '', component: ListComponent }];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ConfirmationDialogModule,
    PreviewUserModule,
    CivilStatusModule,
  ],
  providers: [UserService],
})
export class ListModule {}
