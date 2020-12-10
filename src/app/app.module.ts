import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { InterceptorService } from './_services/interceptor.service';
import { FormsModule } from '@angular/forms';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProfileComponent,
    FileUploadComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
