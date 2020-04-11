import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITimelineEvent, TIMELINE_EVENTS } from '@app/common';

import { Delivery } from '../deliveries/delivery.model';

@Component({
  selector: 'am-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  private visited = true;

  @Input() delivery: Delivery;

  timelineEvents = TIMELINE_EVENTS;

  hasVisited(event: ITimelineEvent) {
    if (event.key === this.delivery.eventType) {
      this.visited = false;
    }

    return this.visited || event.key === this.delivery.eventType;
  }

  getTimestamp(event: ITimelineEvent) {
    return this.delivery.timeline.find(t => t.event === event.key).timestamp;
  }
}
