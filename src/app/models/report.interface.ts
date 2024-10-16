export interface Report {
  reportID: string;
  venueID: string;
  reporterID?: string;
  reportReason: string;
  details: string;
  dateCreated: string;
}
