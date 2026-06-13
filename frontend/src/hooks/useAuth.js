import { useState, useEffect } from 'react';
import { useAuth as useClerkAuth, useUser as useClerkUser, useClerk } from '@clerk/clerk-react';
import AuthService from '../services/authService';

export default function useAuth() {
  const clerkAuth = useClerkAuth();
  const clerkUserObj = useClerkUser();
  const clerkObj = useClerk();

  // Handle case where Clerk is not loaded yet or unavailable
  const isSignedIn = clerkAuth ? clerkAuth.isSignedIn : false;
  const clerkUser = clerkUserObj ? clerkUserObj.user : null;
  const getToken = clerkAuth ? clerkAuth.getToken : null;
  const signOut = clerkObj ? clerkObj.signOut : null;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isSignedIn && clerkUser && getToken) {
          const clerkToken = await getToken();
          setToken(clerkToken);
          localStorage.setItem('token', clerkToken);

          // Fetch from backend profile
          const currentUser = await AuthService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            localStorage.setItem('user', JSON.stringify(currentUser));
          }
        } else {
          // Fallback to local storage (for standard email/password login)
          const currentUser = await AuthService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setToken(localStorage.getItem('token'));
          } else {
            setUser(null);
            setToken(null);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [isSignedIn, clerkUser]);

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      const userData = await AuthService.login(email, password, role);
      AuthService.setUser(userData);
      setUser(userData);
      setToken(userData.token);
      localStorage.setItem('token', userData.token);
      setError(null);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      setLoading(true);
      const userData = await AuthService.signup(name, email, password, role);
      AuthService.setUser(userData);
      setUser(userData);
      setToken(userData.token);
      localStorage.setItem('token', userData.token);
      setError(null);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isSignedIn && signOut) {
      await signOut();
    }
    AuthService.logout();
    setUser(null);
    setToken(null);
    setError(null);
  };

  return {
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    getToken: () => token || localStorage.getItem('token'),
    isAuthenticated: !!user,
    isLoading: loading,
  };
}