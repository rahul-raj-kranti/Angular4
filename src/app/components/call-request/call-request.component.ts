import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'call-request',
  templateUrl: './call-request.component.html',
  styleUrls: ['./call-request.component.css']
})
export class CallRequestComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  proposeTime=this.route.snapshot.queryParams['proposeTime'];
  rejectorsFirstName=this.route.snapshot.queryParams['rejectorsFirstName'];

  ngOnInit() {
  }

  }


