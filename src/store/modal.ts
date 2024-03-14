import { create } from 'zustand'

type State = {
   isOpen: boolean
   open: () => void
   close: () => void
}

export const useModalStore = create<State>((set) => ({
   isOpen: false,
   open: () => set({ isOpen: true }),
   close: () => set({ isOpen: false }),
}))
