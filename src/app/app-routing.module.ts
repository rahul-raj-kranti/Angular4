import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeslotsComponent } from './components/timeslots/timeslots.component';
import { CallRequestComponent } from './components/call-request/call-request.component';


const routes: Routes = [
  
  { path: 'call-request', component: CallRequestComponent },
  { path: ':id', component: TimeslotsComponent },
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
