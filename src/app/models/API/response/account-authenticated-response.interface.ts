export interface AccountAuthenticatedResponse {
  authToken: string;
  accountID: string;
  displayName: string;
  isAdmin?: boolean;
}
