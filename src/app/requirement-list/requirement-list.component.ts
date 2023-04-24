import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { mobileFormat } from '../mobile-format';
import { Requirement } from '../requirement';
import { RequirementService } from '../requirement.service';

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrls: ['./requirement-list.component.scss'],
})
export class RequirementListComponent implements OnInit {
  // for get req from api
  requirements: Requirement[] = [];

  // สร้าง from
  isSmallTable = new FormControl(false);

  constructor(
    private requirementService: RequirementService,
    private router: Router
  ) {
    // ย้ายไปเรียนนอก constructor
    // const ob$ = requirementService.getRequirement();
    // ob$.subscribe(res => this.requirements = res)
    // requirementService.getRequirement().subscribe(res => this.requirements = res)
    // this.requirements = requirementService.getRequirement();
  }

  ngOnInit(): void {
    this.requirementService.getRequirements().subscribe((res) => (this.requirements = res));
  }

  contractMobileNoFormat(mobileNo: string): string {
    console.log('contractMobileNoFormat');
    return mobileFormat(mobileNo);
  }

  onAdd(): void {
    this.router.navigate(['/requirement-form']);
  }

  onDelete(id: number): void {
    this.requirementService.deleteRequirement(id).subscribe(() => {
      // ใช้ filter ไป ซ่อน แถวที่มี id เดียวกับที่ลบไปแล้ว
      this.requirements = this.requirements.filter((v) => v.id != id);
    });
  }

  onUpdate(id: number): void {
    // http://localhost:4200/requirement-form/1003
    // ใน app-routing สำหรับรับค่า id
    // { path: 'requirement-form/:id', component: RequirementFormComponent},
    this.router.navigate(['/requirement-form', id]);
  }

  onView(id: number): void {
    this.router.navigate(['/requirement-view', id]);
  }

}
