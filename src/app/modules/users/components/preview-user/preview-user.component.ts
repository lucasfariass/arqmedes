import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-preview-user',
  templateUrl: './preview-user.component.html',
  styleUrls: ['./preview-user.component.scss'],
})
export class PreviewUserComponent {
  constructor(
    public dialogRef: MatDialogRef<PreviewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
