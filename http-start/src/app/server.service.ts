import {Injectable} from '@angular/core';
import {Http, Headers } from '@angular/http';
@Injectable()
export class ServerService {
    constructor(private http: Http){
    }

    storeServers(servers: any[]){
        const headers = new Headers({
            'Content-Type': 'application/json'
        })
        return this.http.post(
            'https://udemy-ng-http-a48e6.firebaseio.com/data.json', 
            servers, {headers: headers}
            );
    }

    getServer(){
        return this.http.get('https://udemy-ng-http-a48e6.firebaseio.com/data.json');
    }
}