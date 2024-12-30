import { AuthState } from './auth-state/auth-state.interface';
import { SavedState } from './saved-state/saved-state.interface';

export interface AppState {
  authState: AuthState;
  savedState: SavedState;
}
