import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from './base.service';
import AlumniEvent from './events/models/alumni-event.model';
import EventMapper from './events/models/event.mapper';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  providers: [
    // Mappers
    EventMapper,

    // Services
    {
      provide: 'EventsService',
      useFactory: () => {
        return new BaseService<AlumniEvent>('events', new EventMapper())
      } 
    },
  ]
})
export class SharedModule { }
