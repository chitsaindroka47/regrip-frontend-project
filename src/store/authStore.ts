import { create } from 'zustand';

interface AuthState {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem('kanban_user'),
  login: (username: string) => {
    localStorage.setItem('kanban_user', username);
    set({ user: username });
  },
  logout: () => {
    localStorage.removeItem('kanban_user');
    set({ user: null });
  },
}));
