import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConsultantApiService } from '../_services/consultant-api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileSelect', { static: false }) fileSelect: ElementRef< HTMLInputElement >;

  public fileToDelete: string = "";
  public files: File[];
  public userId: string;

  constructor(public consultantApi: ConsultantApiService) { 
    
  }

  ngOnInit(): void {
    //this.consultantApi.init();

    this.consultantApi.UserId$.subscribe(res => {
      this.userId = res;
      this.getFiles();
    });
    
  }

  getFiles() {
    this.consultantApi.UserId$.subscribe(userId => {
      this.consultantApi.getFileList$(userId).subscribe( res => {
        this.files = res;
      }) 
    });
  }

  fileUploadChange(files: FileList): void {
    this.consultantApi.uploadFileList$(files).subscribe( res => {
      this.fileSelect.nativeElement.value = null;
      this.getFiles();
    });
  }

  downloadFile(fileName: string): void {
    this.consultantApi.downloadFile(fileName);
  }

  deleteFile(fileName: string) {
    this.consultantApi.deleteFile$(fileName).subscribe(res => {
      this.getFiles();
    });
  }
}
