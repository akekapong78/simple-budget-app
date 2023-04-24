import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Requirement } from '../requirement';
import { RequirementService } from '../requirement.service';
import { thMobile } from '../th-mobile.validator';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss'],
})
export class RequirementFormComponent implements OnInit {
  editId: number | null = null;

  constructor(
    private requirementService: RequirementService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editId = Number(this.route.snapshot.paramMap.get('id'));

    // ถ้ามี id
    if (this.editId) {
      // this.fg.controls['title'].disable()
      this.requirementService.getRequirementById(this.editId).subscribe((v) => {
        this.fg.patchValue(v); // เอาเฉพาะค่าที่เหมือนกัน มา จบบบบ
      });
      // console.log('id:', this.editId);
    }
  }

  // ย้าย formControl ออกมาประกาศ ก่อน ช่วยให้การ valid ใน html ง่ายขึ้น
  id = new FormControl('');
  title = new FormControl('', Validators.required);
  contactMobileNo = new FormControl('', [Validators.required, thMobile]); // สร้าง validator เอง
  // ืnew formGroup
  fg = new FormGroup({
    // title: new FormControl('', Validators.required),
    title: this.title,
    contactMobileNo: this.contactMobileNo,
  });

  onSubmit(): void {
    if (this.editId) {
      const editRequirement = this.fg.value as Requirement;
      this.requirementService
        .editRequirement(this.editId, editRequirement)
        .subscribe(() => this.router.navigate(['/requirement-list']));
    } else {
      // prepare data for API
      const newRequirement = this.fg.value as Requirement;
      this.requirementService
        .addRequirement(newRequirement)
        .subscribe(() => this.router.navigate(['/requirement-list']));
      // ตย. การ subscrbe แบบ complete ใช้ () => {} ได้เลย
    }
  }

  onBack(): void {
    this.router.navigate(['/requirement-list']);
  }

  // การ Deactivae
  confirmLeaveForm(): boolean {
    if (this.fg.touched) {
      return confirm('Confirm data or leave this page...?');
    }
    return true;
  }
}
