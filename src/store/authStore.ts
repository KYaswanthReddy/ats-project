import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '../types';

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@example.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    createdAt: '2024-01-15T10:00:00Z',
    lastActive: new Date().toISOString(),
    isVerified: true,
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js']
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'recruiter@example.com',
    role: 'recruiter',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
    createdAt: '2024-01-10T09:00:00Z',
    lastActive: new Date().toISOString(),
    isVerified: true,
    location: 'New York, NY'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: '2024-01-01T08:00:00Z',
    lastActive: new Date().toISOString(),
    isVerified: true,
    location: 'Remote'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password123') {
          set({ user, isAuthenticated: true });
        } else {
          throw new Error('Invalid credentials');
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      register: async (userData: Partial<User>) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.name || '',
          email: userData.email || '',
          role: userData.role || 'student',
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150`,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          isVerified: false,
          ...userData
        };
        
        mockUsers.push(newUser);
        set({ user: newUser, isAuthenticated: true });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);