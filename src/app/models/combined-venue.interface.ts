import { Venue } from './venue.interface';

export interface CombinedVenue {
  venue: Venue;
  user: {
    characterName: string;
    characterServer: string;
    characterAvatarURL: string;
  };
}
