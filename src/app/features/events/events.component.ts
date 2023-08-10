import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from 'src/app/shared/base.service';
import AlumniEvent from 'src/app/shared/events/models/alumni-event.model';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource: AlumniEvent[] = [];

  constructor(
    @Inject('EventsService') public eventsService: BaseService<AlumniEvent>
  ) {
    
  }

  ngOnInit() {
    this.eventsService
      .get()
      .subscribe(events => {
        this.dataSource = events
      })
  }

  addEvent() {
    const prefix = ['amazing', 'challenging', 'fantastic', 'awesome', 'fabulous', 'intriguing', 'boring']
    const names = ['meeting', 'party', 'afterwork', 'workshop', 'hackathon']
    this.eventsService.add({
      name: `${prefix[Math.floor(Math.random() * prefix.length)]} ${names[Math.floor(Math.random() * names.length)]}`
    })
  }

  deleteEvent(id: string) {
    this.eventsService.delete(id)
  }
}
