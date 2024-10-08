import { AuthState } from './auth-state.interface';

export const authInitialState: AuthState = {
  authToken: '',
  accountID: '',
  userAvatarUrl: '',
  characterName: '',
  characterServer: ''
};
