import { authStateReducer } from './auth-state/auth-state.reducer';
import { savedStateReducer } from './saved-state/saved-state.reducer';

export const rootReducer = {
  authState: authStateReducer,
  savedState: savedStateReducer
};
