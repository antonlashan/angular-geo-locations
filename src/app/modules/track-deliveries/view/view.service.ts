import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Delivery } from '../deliveries/delivery.model';

@Injectable()
export class ViewService {
  constructor(private http: HttpClient) {}

  getDelivery(id: number) {
    // now returns an Observable of Delivery model
    return this.http.get('deliveries.json').pipe(
      map((res: object[]) => {
        const del = res.find((obj: any) => obj.id === id);
        return new Delivery(del);
      })
    );
  }
}
