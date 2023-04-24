import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './auth/admin.guard';
import { RequirementApprovalComponent } from './requirement-approval/requirement-approval.component';
import { RequirementFormComponent } from './requirement-form/requirement-form.component';
import { RequirementListComponent } from './requirement-list/requirement-list.component';
import { RequirementViewComponent } from './requirement-view/requirement-view.component';

// map url => component
const routes: Routes = [
  { path: '', component: RequirementListComponent },
  { path: 'requirement-list', component: RequirementListComponent },
  {
    path: 'requirement-form',
    component: RequirementFormComponent,
    canDeactivate: [
      (component: RequirementFormComponent) => component.confirmLeaveForm(),
    ],
  },
  {
    path: 'requirement-form/:id',
    component: RequirementFormComponent,
    canDeactivate: [
      (component: RequirementFormComponent) => component.confirmLeaveForm(),
    ],
  },
  { path: 'requirement-view/:id', component: RequirementViewComponent },
  {
    path: 'requirement-approval',
    component: RequirementApprovalComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '/requirement-list', pathMatch: 'full' }   // ต้องอยู่ล่างสุด
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
