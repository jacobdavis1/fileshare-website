import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultantApiService {

  private fileShareEndpointOrigin = `https://fileshare-service.azurewebsites.net`;
    //`https://localhost:5001`;
  public UserId$: ReplaySubject<string> = new ReplaySubject<string>();
  private myId: string;

  constructor(private client: HttpClient) {
    this.UserId$.subscribe(res => this.myId = res);
  }

  getUserId() {
    this.client.get(`${this.fileShareEndpointOrigin}/api/file/whoami`, {responseType: 'text'}).subscribe(res => {
      this.UserId$.next(res);
    });
  }

  uploadFileList$(files : FileList): Observable<any> {

    let formData : FormData = new FormData();
    for (let i = 0; i < files.length; ++i) {
      formData.append(`file${i}`, files[i]);
    }

    console.log("Trying to upload");

    return this.client.post(`${this.fileShareEndpointOrigin}/api/file/${this.myId}`, formData);
  }

  getFileList$(userId: string): Observable<File[]> {
    return this.client.get<File[]>(`${this.fileShareEndpointOrigin}/api/file/${userId}`);
  }

  downloadFile(fileName: string): void {
    let url = `${this.fileShareEndpointOrigin}/api/file/${this.myId}/${fileName}`;
    this.client.get(url, { responseType: 'blob'}).subscribe((response: Blob) => {
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
      downloadLink.setAttribute('download', fileName);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  deleteFile$(fileName: string): Observable<any> {
    return this.client.delete(`${this.fileShareEndpointOrigin}/api/file/${this.myId}/${fileName}`);
  }

  searchUsers(type: string, query: string) {
    return this.client.get<any[]>(`${this.fileShareEndpointOrigin}/api/file/find?type=${type}&query=*${query}*`);
  }
}
