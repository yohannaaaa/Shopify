import { createContext } from 'react';
import { User, UserCredential } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  userInfo: { email: string; firstName: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
