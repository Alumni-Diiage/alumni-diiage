import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from './base.service';
import AlumniEvent from './events/models/alumni-event.model';
import EventMapper from './events/models/event.mapper';
import { UserMapper } from './auth/models/user-mapper';
import { AuthService } from './auth/services/auth.service';


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
    UserMapper,

    // Services
    AuthService,
    {
      provide: 'EventsService',
      useFactory: () => {
        return new BaseService<AlumniEvent>('events', new EventMapper())
      } 
    },
  ]
})
export class SharedModule { }
