export interface VenueChangeRequest {
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
    variableDay?: string;
    variableTimes?: string;
  }[];
  website: string;
  tags: string[];
}
