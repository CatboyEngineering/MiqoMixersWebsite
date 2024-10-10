import { AuthState } from './auth-state.interface';

export const authInitialState: AuthState = {
  authToken: '',
  characterAvatarUrl: '',
  accountID: '',
  characterID: '',
  characterName: '',
  characterServer: '',
  characterVerified: false
};
