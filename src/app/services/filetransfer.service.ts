import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { ApiPaths } from "src/assets/api-paths";

@Injectable({
    providedIn: 'root'
})

export class FileTransferService {

    constructor(private httpClient: HttpClient) { }

    getFile(fileName: string): Observable<File> {
        const headers = new HttpHeaders().set('Content-Type', 'application/pdf; charset=utf-8');
        const requestOptions: Object = {
            headers: headers,
            responseType: 'blob'
        }

        return this.httpClient.get<File>(
            `${ApiPaths.base}/files/${fileName}`, requestOptions
        )
    }

}