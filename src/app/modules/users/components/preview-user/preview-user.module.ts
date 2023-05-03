import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { CivilStatusModule } from '../../pipes/civil-status/civil-status.module';
import { PreviewUserComponent } from './preview-user.component';

@NgModule({
  declarations: [PreviewUserComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    CivilStatusModule,
  ],
  exports: [PreviewUserComponent],
})
export class PreviewUserModule {}
