import { TimelineEvent, TIMELINE_EVENTS, VehicleType } from '@app/common';

export class VehicleInfo {
  private _type: VehicleType;
  latitude: number;
  longitude: number;
  icon: string;

  constructor(obj: any) {
    this.type = obj.type;
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
  }

  set type(type: VehicleType) {
    this._type = type;
    switch (type) {
      case VehicleType.BIKE:
        this.icon = '/assets/icons/' + type + '.png';
        break;
      case VehicleType.CAR:
        this.icon = '/assets/icons/' + type + '.png';
        break;
      default:
        this.icon = '/assets/icons/car.png';
    }
  }
  get type() {
    return this._type;
  }
}

export class Events {
  event: TimelineEvent;
  timestamp: string;

  constructor(obj: any) {
    this.event = obj.event;
    this.timestamp = obj.timestamp;
  }
}

export class Delivery {
  id: number;
  customerName: string;
  address: string;
  latitude: number;
  longitude: number;
  vehicleInfo: VehicleInfo;
  eventType: TimelineEvent;
  eventLbl: string;
  eventTime: string;
  timeline: Events[];

  // obj is json response from api endpoint
  constructor(obj: any) {
    this.id = obj.id;
    this.customerName = obj.customerName;
    this.address = obj.deliveryAddress;
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
    this.vehicleInfo = new VehicleInfo(obj.vehicleInfo);
    this.eventType = obj.eventType;
    this.eventLbl = TIMELINE_EVENTS.find(e => e.key === obj.eventType).label;
    this.eventTime = obj.eventTime;
    this.timeline = obj.timeline.map(o => new Events(o));
  }
}
