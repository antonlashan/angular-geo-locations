import { Component } from '@angular/core';
import { TIMELINE_EVENTS } from '@app/common';

@Component({
  selector: 'am-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {
  timelineEvents = TIMELINE_EVENTS;
}
