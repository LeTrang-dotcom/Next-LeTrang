import { create } from "zustand";


const useCartStore = create((set) => ({
  isShowCart: false,
  setIsShowCart: (value) => set(() => ({ isShowCart: value })),
}));
export default useCartStore;
