import { Prodak } from '@/types';
import { create } from 'zustand';

interface PrefiewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (data: Prodak) => void;
  data?: Prodak;
}

const usePrieviewModal = create<PrefiewModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Prodak) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePrieviewModal;