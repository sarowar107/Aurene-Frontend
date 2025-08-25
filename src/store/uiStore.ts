import { create } from 'zustand';

type AuthModalView = 'login' | 'signup';

interface UIState {
  isAuthModalOpen: boolean;
  authModalView: AuthModalView;
  openAuthModal: (view: AuthModalView) => void;
  closeAuthModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAuthModalOpen: false,
  authModalView: 'login',
  openAuthModal: (view) => set({ isAuthModalOpen: true, authModalView: view }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}));
