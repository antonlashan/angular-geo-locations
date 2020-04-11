import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Delivery } from './delivery.model';

@Injectable()
export class DeliveriesService {
  constructor(private http: HttpClient) {}

  getDeliveries() {
    // now returns an Observable of Delivery models
    return this.http.get('deliveries.json').pipe(
      map((res: object[]) =>
        res
          .map(obj => new Delivery(obj))
          .sort((a, b) => {
            // sort as ascending date
            return +new Date(a.eventTime) - +new Date(b.eventTime);
          })
      )
    );
  }
}
