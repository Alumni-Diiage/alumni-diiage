import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { MaterialModule } from 'src/app/material/material.module';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  declarations: [
    EventsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
