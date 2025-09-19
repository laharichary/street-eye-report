import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'police';
  points?: number;
  rank?: number;
  badgeLevel?: 'bronze' | 'silver' | 'gold' | 'diamond';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'citizen' | 'police') => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: 'citizen' | 'police') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on init
    const storedUser = localStorage.getItem('civic-eye-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'citizen' | 'police'): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock login - In real app, this would call your API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36),
      email,
      name: email.split('@')[0],
      role,
      ...(role === 'citizen' && {
        points: 1250,
        rank: 15,
        badgeLevel: 'silver' as const
      })
    };

    setUser(mockUser);
    localStorage.setItem('civic-eye-user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (email: string, password: string, name: string, role: 'citizen' | 'police'): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36),
      email,
      name,
      role,
      ...(role === 'citizen' && {
        points: 0,
        rank: 999,
        badgeLevel: 'bronze' as const
      })
    };

    setUser(mockUser);
    localStorage.setItem('civic-eye-user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civic-eye-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};