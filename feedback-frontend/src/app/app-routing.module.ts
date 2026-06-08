import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SubmitFeedbackComponent } from './components/submit-feedback/submit-feedback.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'submit-feedback', component: SubmitFeedbackComponent, canActivate: [RoleGuard] },
  { path: 'feedback-list', component: FeedbackListComponent, canActivate: [RoleGuard] },
  { path: 'admin-panel', component: AdminPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
