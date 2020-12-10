import { Component, OnInit } from '@angular/core';
import { ConsultantApiService } from '../_services/consultant-api.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  public searchQuery: string;
  public searchType: string;
  public users: any[];
  public currentUser: any;
  public currentUserFiles: any[];

  constructor(private consultantApi: ConsultantApiService) { }

  ngOnInit(): void {
  }

  clickSearch(): void {
    this.consultantApi.searchUsers(this.searchType, this.searchQuery).subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }

  clickUser(user: any): void {
    if (this.currentUser == undefined
        || this.currentUser.email != user.email) {
      this.currentUser = user;
      this.currentUserFiles = null;
      this.consultantApi.getFileList$(user.user_id.replace("auth0|", "auth0") as string).subscribe( res => {
        this.currentUserFiles = res;
        console.log(this.currentUser);
        console.log(res);
      });
    }
  }

  downloadFile(fileName: string): void {
    this.consultantApi.downloadFile(fileName);
  }

  deleteFile(fileName: string) {
    this.consultantApi.deleteFile$(fileName).subscribe(res => res);
  }
}
