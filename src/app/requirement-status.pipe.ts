import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requirementStatus'
})
export class RequirementStatusPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if (value === 'A') {
      return 'Approve'
    }
    if (value === 'R') {
      return 'Reject'
    }
    return null;
  }
}
