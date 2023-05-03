import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CivilStatusPipe } from './civil-status.pipe';

@NgModule({
  declarations: [CivilStatusPipe],
  imports: [CommonModule],
  exports: [CivilStatusPipe],
})
export class CivilStatusModule {}
