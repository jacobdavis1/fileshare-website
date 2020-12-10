import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UserSearchComponent } from './user-search/user-search.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload',
    component: FileUploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: UserSearchComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
