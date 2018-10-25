import { Component, OnInit} from '@angular/core';
import { Tel3PathyService } from '../../services/tel3-pathy.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import "toastr";
import * as Toastr from 'toastr';
import * as moment from 'moment';
import { _ } from 'underscore';

@Component({
  selector:'timeslots',
  templateUrl: 'timeslots.component.html',
  styleUrls: ['timeslots.component.css'],
  providers:[ Tel3PathyService ]
})
export class TimeslotsComponent implements OnInit {
public timeSlots :any=[];
getSlotsOfTime:any;
rejectorsPhoneNumber:any;rejectorsFirstName:any; initiatorPhoneNumber:any;
constructor(private dataService: Tel3PathyService, 
            private atp : AmazingTimePickerService, 
            private route: ActivatedRoute,
            private router: Router) {}

ngOnInit(){ 
console.log(this.router.url);
var id=this.router.url;
    id=id.split('#')[1];
    id=id.replace('/', '');
console.log(id);


// service layer for get timeSlots
this.dataService.getTimeSlots(id)
                .subscribe(response => {
                                this.getSlotsOfTime = this.dataService.utcToLocal(response.json().phoneTimeSlots);//UTC time slots
                                this.timeSlots = this.getSlotsOfTime;
                                this.timeSlots = this.converttimetoformat(this.timeSlots);
                                this.rejectorsPhoneNumber=response.json().rejectorsPhoneNumber; //rejectorsPhoneNumber we use as a toPhoneNumber
                                this.rejectorsFirstName=response.json().user.firstName;//rejectoreFirstName
                                this.initiatorPhoneNumber=response.json().callersPhoneNumber;  //callersPhoneNumber
                            },error => {Toastr.error("<b>URL NOT FOUND</b>");})
            
            
            }
getListOfTimeSlots:any;
converttimetoformat(timeSlot){
    if(timeSlot.length > 0){
        var timeSlotList = [];
        _.each(timeSlot, function(timeslots, index){
            var time = timeslots.split("-");
            var startTime = moment(time[0]).format("hh:mm a");
            var endTime = moment(time[1]).format("hh:mm a");
            timeSlotList.push(startTime+ " - "+endTime);
          });
        return this.getListOfTimeSlots = timeSlotList;
    }
}

// show selected user time
finalSelectedTime:any;
selectedTime:any;
selectedTiming:any;
selectedTimeList=[];
selectedDate:any;
    open(index,timeSlot) {
        this.selectedTiming = this.getSlotsOfTime[index];
        this.selectedTiming = this.selectedTiming.split('-');
        this.selectedDate = moment(this.selectedTiming[0]).format('ddd MMM DD YYYY');
        var startTime = moment(this.selectedTiming[0]).format("HH:mm");
        var endTime = moment(this.selectedTiming[1]).format("HH:mm");
        
        const amazingTimePicker = this.atp.open({
        time: startTime,
        theme: 'material-blue',
        
        rangeTime: {
            start: startTime, 
            end: endTime 
        },
    });
    amazingTimePicker.afterClose().subscribe(time => {
    this.timeSlots[index] = time;
    this.timeSlots[index] = moment(this.selectedDate+" "+this.timeSlots[index]+":00 GMT+0530 (IST)").format('hh:mm a');
    this.finalSelectedTime = this.timeSlots[index];
    console.log(new Date(moment().format('L')+' '+this.finalSelectedTime).toUTCString());
    
    });
    }

//call request
postTimeSlot(){
if(this.rejectorsPhoneNumber!=null && this.finalSelectedTime!=null){
let callRequestData={
        toPhoneNumber: `${this.rejectorsPhoneNumber}`,
        isAutoApproved: 'true',
        proposeTime:`${new Date(moment().format('L')+' '+this.finalSelectedTime).toUTCString()}`,
        when: 'at' + `  ${new Date(moment().format('L')+' '+this.finalSelectedTime).toUTCString()}`,
        requestSource :"WEB/UNAUTHENTICATED",
        initiatorPhoneNumber:` ${this.initiatorPhoneNumber}`,
        initiatorUserId: "DEFAULT:GAURAV.VERMA@GMAIL.COM",};

//call service layer to post time slots           
this.dataService.postCallRequest(JSON.stringify(callRequestData))
.subscribe(response=>{
                        if(response.json().id)
                        {
                            this.router.navigate( 
                                ['/call-request'],
                                { queryParams:{
                                    proposeTime:  this.finalSelectedTime,
                                    rejectorsFirstName: this.rejectorsFirstName},
                                    replaceUrl: false, }); 
                        }

                },error => {Toastr.error('<b>Request Not Accepted As For Now</b>');})
}
//error handling
else{Toastr.error('<b>PLEASE SELECT THE TIME FIRST</b>');}


    }
}