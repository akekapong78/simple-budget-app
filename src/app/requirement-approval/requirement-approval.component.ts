import { Component } from '@angular/core';
import { Requirement } from '../requirement';
import { RequirementService } from '../requirement.service';

@Component({
  selector: 'app-requirement-approval',
  templateUrl: './requirement-approval.component.html',
  styleUrls: ['./requirement-approval.component.scss'],
})
export class RequirementApprovalComponent {
  requirements: Requirement[] = [];

  constructor(private requirementService: RequirementService) {}

  ngOnInit(): void {
    this.requirementService
      .getRequirements()
      .subscribe((rs) => (this.requirements = rs));
  }

  onApprove(id: number): void {
    this.requirementService.approveRequirement(id).subscribe(() => {
      this.requirements = this.requirements.map((v) =>
        v.id === id ? { ...v, status: 'A' } : { ...v }
      );
      // ... หมายถึง เอาทางซ้าย ทั้งหมด ออกมา แล้วเขียนทับด้วย A
      // ถ้าไม่ใช้ ก็ เอาของเดิมกลับเข้าไป
    });
  }

  onReject(id: number): void {
    this.requirementService.approveRequirement(id).subscribe(() => {
      this.requirements = this.requirements.map((v) =>
        v.id === id ? { ...v, status: 'R' } : { ...v }
      );
      // ... หมายถึง เอาทางซ้าย ทั้งหมด ออกมา แล้วเขียนทับด้วย A
      // ถ้าไม่ใช้ ก็ เอาของเดิมกลับเข้าไป
    });
  }
}
