// !!! NOTE
// defined colors related to events are in main styles.scss

export enum TimelineEvent {
  AT_WAREHOUSE = 'at_warehouse',
  SENT_FROM_STORE = 'sent_from_store',
  ARRIVED_TO_DESTINATION = 'arrived_to_destination',
}

export interface ITimelineEvent {
  key: TimelineEvent;
  label: string;
}

export const TIMELINE_EVENTS: ITimelineEvent[] = [
  { key: TimelineEvent.AT_WAREHOUSE, label: 'At warehouse' },
  { key: TimelineEvent.SENT_FROM_STORE, label: 'Sent from store' },
  {
    key: TimelineEvent.ARRIVED_TO_DESTINATION,
    label: 'Arrived to destination',
  },
];

export const STORE_ADDRESS = {
  lat: 59.330244,
  lng: 18.059959,
  address: 'Vasagatan 16, 111 20 Stockholm, Sweden',
  name: 'Geo locations Store',
};

export enum VehicleType {
  BIKE = 'bike',
  CAR = 'car',
}

export const VEHICLE_TYPES = [
  { key: VehicleType.BIKE, label: 'Bike' },
  { key: VehicleType.CAR, label: 'Car' },
];
