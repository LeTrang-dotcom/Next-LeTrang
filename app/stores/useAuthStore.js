import { create } from "zustand";
import { persist , createJSONStorage} from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            userInfo: null,
            setUserInfo: (user) => set((state) => ({userInfo: user})), 
        }),
        {
            name: "auth-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useAuthStore 