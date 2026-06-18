import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[]; // array of product IDs
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) => set((state) => {
        if (!state.items.includes(id)) {
          return { items: [...state.items, id] };
        }
        return state;
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item !== id),
      })),
      isInWishlist: (id) => get().items.includes(id),
    }),
    {
      name: 'heritageloom-wishlist',
    }
  )
);
