import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Constants } from './constants';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { TimeslotsComponent } from './components/timeslots/timeslots.component';
import { CallRequestComponent } from './components/call-request/call-request.component';
import { AppRoutingModule } from './app-routing.module';

const appRoutes: Routes = [
  { path: '', component: TimeslotsComponent },
  { path: 'call-request/:data', component: CallRequestComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    TimeslotsComponent,
    CallRequestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AmazingTimePickerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AppRoutingModule,
    
  ],
  providers: [Constants],
  bootstrap: [AppComponent]
})
export class AppModule {}
