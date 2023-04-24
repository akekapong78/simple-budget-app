import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequirementService } from '../requirement.service';
import { thMobile } from '../th-mobile.validator';

@Component({
  selector: 'app-requirement-view',
  templateUrl: './requirement-view.component.html',
  styleUrls: ['./requirement-view.component.scss']
})
export class RequirementViewComponent implements OnInit{
  viewId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: RequirementService
  ) {}

  ngOnInit(): void {
    this.viewId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.viewId) {
      this.service.getRequirementById(this.viewId).subscribe(v => {
        this.fg.patchValue(v);
      })
    }
  }

  // Build Emthy Form
  // 1. FormControl
  id = new FormControl('');
  title = new FormControl('', Validators.required);
  contactMobileNo = new FormControl('', [Validators.required, thMobile]); // สร้าง validator เอง
  // 2. FormGroup
  fg = new FormGroup({
    title: this.title,
    contactMobileNo: this.contactMobileNo,
  });

  // redirect to list
  onBack(): void {
    this.router.navigate(['/requirement-list']);
  }
}
