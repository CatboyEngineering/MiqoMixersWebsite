export interface Account {
  accountID: string;
  displayName: string;
  maxAllowedShells: number;
  isAdmin?: boolean;
}
