import { VenueHoursStatus } from './enum/venue-hours-status.enum';

export interface Venue {
  venueID: string;
  userID: string;
  venueName: string;
  about: string;
  datacenter: string;
  world: string;
  district: string;
  ward: number;
  plot: number;
  hours: {
    day?: string;
    open?: string;
    close?: string;
    timezoneID?: string;
    variableDay?: string;
    variableTimes?: string;
  }[];
  hoursStatus?: VenueHoursStatus;
  website: string;
  tags: string[];
  dateCreated: string;
  syncShellID: string;
  syncShellPass: string;
  stars: number;
}
