import { Pipe, PipeTransform } from '@angular/core';
import { CivilStatusDescription, CivilStatusEnum } from '../../models/civil-status.enum';

@Pipe({
  name: 'civilStatus'
})
export class CivilStatusPipe implements PipeTransform {

  transform(value: CivilStatusEnum): string {
    return CivilStatusDescription[value];
  }

}
