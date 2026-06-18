import { useState, useEffect, useRef, useCallback } from 'react';
import AuthService from '../services/authService';

const AUTH_EVENT = 'auth-state-changed';
const listeners = new Set();
let sharedUser = (() => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
})();
let sharedToken = localStorage.getItem('token');
let sharedLoading = false;

function broadcast() {
  listeners.forEach(fn => fn());
}

/**
 * Re-reads auth data from localStorage and syncs module-level state.
 * Call this after writing auth data to localStorage outside of useAuth
 * (e.g. from OAuth2RedirectHandler).
 */
export function syncAuthState() {
  try {
    const stored = localStorage.getItem('user');
    sharedUser = stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem('user');
    sharedUser = null;
  }
  sharedToken = localStorage.getItem('token');
  sharedLoading = false;
  broadcast();
}

export default function useAuth() {
  const [, forceUpdate] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    const listener = () => {
      if (mountedRef.current) forceUpdate(n => n + 1);
    };
    listeners.add(listener);
    return () => {
      mountedRef.current = false;
      listeners.delete(listener);
    };
  }, []);

  const login = useCallback(async (email, password, role) => {
    sharedLoading = true;
    broadcast();
    try {
      const userData = await AuthService.login(email, password, role);
      AuthService.setUser(userData);
      localStorage.setItem('token', userData.token);
      sharedUser = userData;
      sharedToken = userData.token;
      sharedLoading = false;
      broadcast();
      return userData;
    } catch (err) {
      sharedLoading = false;
      broadcast();
      throw err;
    }
  }, []);

  const signup = useCallback(async (name, email, password, role) => {
    sharedLoading = true;
    broadcast();
    try {
      const userData = await AuthService.signup(name, email, password, role);
      AuthService.setUser(userData);
      localStorage.setItem('token', userData.token);
      sharedUser = userData;
      sharedToken = userData.token;
      sharedLoading = false;
      broadcast();
      return userData;
    } catch (err) {
      sharedLoading = false;
      broadcast();
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    AuthService.logout();
    sharedUser = null;
    sharedToken = null;
    sharedLoading = false;
    broadcast();
  }, []);

  return {
    user: sharedUser,
    token: sharedToken,
    loading: sharedLoading,
    error: null,
    login,
    signup,
    logout,
    getToken: () => sharedToken || localStorage.getItem('token'),
    isAuthenticated: !!sharedUser,
    isLoading: sharedLoading,
  };
}
