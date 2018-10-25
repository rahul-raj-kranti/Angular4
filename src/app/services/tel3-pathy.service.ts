import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class Tel3PathyService {
  localTimeSlots :any=[];
  constructor(private http: Http, private constant:Constants) {}

  //getting Base API Url from Constant file
  url:string=this.constant.url;
      
  // bind with GET API
  getTimeSlots(key) {
      return this.http.get(`${this.url}/reject/${key}`);
  }

  // bind with POST API
  postCallRequest(callRequestData){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.url}/requests`,callRequestData, {headers:headers});
  }
  
  //convert UTC to LOCAL
  utcToLocal(utcTime){
    let i=0;
    for (let utcTimeSlot of utcTime) {
      let splitUtcTimeIndex0=utcTimeSlot.split('::')[0];
      let splitUtcTimeIndex1= utcTimeSlot.split('::')[1];
      this.localTimeSlots[i] = new Date(splitUtcTimeIndex0)+ '-' +new Date(splitUtcTimeIndex1);
      i=i+1;
    }
      return this.localTimeSlots; 
  }
}
