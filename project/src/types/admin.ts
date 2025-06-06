export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}