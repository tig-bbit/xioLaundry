import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccessClaundry {
  server: string = 'http://localhost/_alaundry/api_laundry/';
  //server: string = 'https://www.carvellonic.com/server_laundryapp/';

  constructor(public http : Http) {
  }

  postData(body, file) {
      
      let type = "application/json; charset=UTF-8";
      let headers = new Headers({ 'Content-Type': type});
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.server + file, JSON.stringify(body), options)
        .map(res => res.json());
  }

}