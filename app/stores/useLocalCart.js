import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useLocalCart = create(
  persist(
    (set) => ({
      productsInCart: [],
      quantityProduct: 1,
      setQuantityProduct: (quantity) =>
        set(() => ({ quantityProduct: quantity })),
      addProductToCart: (product) =>
        set((state) => {
          const existingProduct = state.productsInCart.find(
            (p) => p.id === product.id
          );

          if (existingProduct) {
            if (existingProduct.stock > existingProduct.quantity) {
              return {
                productsInCart: state.productsInCart.map((p) =>
                  p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                ),
              };
            } else {
              return state;
            }
          } else {
            return {
              productsInCart: [
                ...state.productsInCart,
                { ...product, quantity: 1 },
              ],
            };
          }
        }),

      removeProductFromCart: (product) =>
        set((state) => ({
          productsInCart: state.productsInCart.filter(
            (p) => p.id !== product.id
          ),
        })),
      decreaseQuantityProduct: (product) =>
        set((state) => {
          const existingProduct = state.productsInCart.find(
            (p) => p.id === product.id
          );
          if (existingProduct) {
            if (existingProduct.quantity > 1) {
              return {
                productsInCart: state.productsInCart.map((p) =>
                  p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
                ),
              };
            } else {
              return state;
            }
          } else {
            return state;
          }
        }),
      increaseQuantityProduct: (product) =>
        set((state) => {
          const existingProduct = state.productsInCart.find(
            (p) => p.id === product.id
          );
          if (existingProduct) {
            if (existingProduct.quantity < existingProduct.stock) {
              return {
                productsInCart: state.productsInCart.map((p) =>
                  p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                ),
              };
            } else {
              return state;
            }
          } else {
            return state;
          }
        }),
      changeQuantityProduct: (product) =>
        set((state) => {
          const existingProduct = state.productsInCart.find(
            (p) => p.id === product.id
          );
          if (existingProduct) {
            if (existingProduct.stock > existingProduct.quantity) {
              return {
                productsInCart: state.productsInCart.map((p) =>
                  p.id === product.id ? product : p
                ),
              };
            } else {
              return state;
            }
          } else {
            return state;
          }
        }),
      setProductsInCart: (products) =>
        set((state) => ({ productsInCart: products })),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLocalCart;
