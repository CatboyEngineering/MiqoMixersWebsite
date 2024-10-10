export interface AccountAuthenticatedResponse {
  authToken: string;
  accountID: string;
  characterAvatarUrl: string;
  characterID: string;
  characterName: string;
  characterServer: string;
  characterVerified: boolean;
  characterVerificationCode?: string;
}
