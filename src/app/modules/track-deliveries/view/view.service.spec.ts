import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { ViewService } from './view.service';

export const mockDeliveries = [
  {
    id: 1,
    customerName: 'Whitehead Suarez',
    deliveryAddress: '459 Clove Road, Caroleen, Utah, 7688',
    latitude: 57.230599,
    longitude: 15.1162,
    vehicleInfo: {
      type: 'bike',
      latitude: 57.203188,
      longitude: 15.632,
    },
    eventType: 'sent_from_store',
    eventTime: '2020-01-28T01:29:12',
    timeline: [
      {
        event: 'at_warehouse',
        timestamp: '2020-01-28T09:11:23',
      },
      {
        event: 'sent_from_store',
        timestamp: '2020-01-07T06:54:15',
      },
      {
        event: 'arrived_to_destination',
        timestamp: '2020-01-11T10:34:26',
      },
    ],
  },
  {
    id: 2,
    customerName: 'Pickett Owens',
    deliveryAddress: '932 Albemarle Terrace, Gibsonia, California, 4143',
    latitude: 57.169818,
    longitude: 15.3992,
    vehicleInfo: {
      type: 'car',
      latitude: 57.873139,
      longitude: 15.2268,
    },
    eventType: 'at_warehouse',
    eventTime: '2020-01-11T10:52:53',
    timeline: [
      {
        event: 'at_warehouse',
        timestamp: '2020-01-21T08:49:10',
      },
      {
        event: 'sent_from_store',
        timestamp: '2020-01-11T05:38:46',
      },
      {
        event: 'arrived_to_destination',
        timestamp: '2020-01-07T09:21:36',
      },
    ],
  },
];

describe('ViewService', () => {
  let httpTestingController: HttpTestingController;
  let viewService: ViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    viewService = TestBed.get(ViewService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(viewService).toBeTruthy();
  });

  it('should match getDelivery Observable data', async(() => {
    viewService.getDelivery(1).subscribe(delivery => {
      expect(delivery.address).toEqual('459 Clove Road, Caroleen, Utah, 7688');
      expect(delivery.customerName).toEqual('Whitehead Suarez');
    });

    const req = httpTestingController.expectOne('deliveries.json');
    expect(req.request.method).toEqual('GET');
    req.flush(mockDeliveries);
  }));

  it('should handle getDelivery errors', async(() => {
    viewService.getDelivery(1).subscribe(
      () => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual('emsg');
      }
    );

    const req = httpTestingController.expectOne('deliveries.json');
    expect(req.request.method).toEqual('GET');
    req.flush('emsg', { status: 404, statusText: 'Not Found' });
  }));
});
