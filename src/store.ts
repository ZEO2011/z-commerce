import { UserResponse } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dummyUserData } from "./constants";
const useTheme = create<themeStoreType>()(
    persist(
        (set) => ({
            theme: "system",
            setTheme: (theme) => set(() => ({ theme })),
        }),
        {
            name: "theme",
        },
    ),
);
const useShoppingCart = create<shoppingCartType>()(
    persist(
        (set) => ({
            amountProducts: [],
            setAmountProducts: (id) =>
                set((c) => ({
                    amountProducts: [
                        ...c.amountProducts,
                        typeof id === "number" ? id : parseInt(id),
                    ],
                })),
            setAllAmountProducts: (Ids) =>
                set(() => ({
                    amountProducts: Ids.map((id) => parseInt(id)),
                })),
            removeProduct: (id) =>
                set((c) => ({
                    amountProducts: [
                        ...c.amountProducts.filter((el) => el !== id),
                    ],
                })),
            clearProducts: () => set(() => ({ amountProducts: [] })),
        }),
        { name: "shoppingCart" },
    ),
);

type useUserDataType = {
    authenticated: boolean;
} & UserResponse;
const useUserData = create<
    useUserDataType & { setUserData: (data: useUserDataType) => void }
>()(
    persist(
        (set) => ({
            authenticated: false,
            data: { user: dummyUserData, error: null },
            error: null,
            setUserData: (data) => set(() => data),
        }),
        { name: "userData" },
    ),
);
type useProductsType<T> = {
    products: T[];
    loading: boolean;
    setProducts: (products: T[]) => void;
    setProduct: (id: number, data: T) => void;
};

const useProducts = create<useProductsType<productType>>()(
    persist(
        (set) => ({
            products: [],
            loading: true,
            setProducts: (products) =>
                set(() => ({ products, loading: false })),
            setProduct: (id, data) =>
                set((c) => ({
                    ...c,
                    products: c.products.map((p) =>
                        p.id === id ? data : p,
                    ),
                })),
        }),
        { name: "products" },
    ),
);

type UseProfilePicture<T> = {
    loading: boolean;
    profilePicture: null | T;
    setProfilePicture: (profilePicture: T, loading: boolean) => void;
};

const useProfilePicture = create<UseProfilePicture<string>>((set) => ({
    loading: true,
    profilePicture: null,
    setProfilePicture: (profilePicture, loading) =>
        set(() => ({ profilePicture, loading })),
}));

type UsePurchasedList<T> = {
    purchasedList: T[];
    isLoading: boolean;
    setPurchasedList: (purchasedList: T[], isLoading: boolean) => void;
};

const usePurchasedList = create<UsePurchasedList<productType>>((set) => ({
    purchasedList: [],
    isLoading: true,
    setPurchasedList: (purchasedList, isLoading) =>
        set({ purchasedList, isLoading }),
}));

export {
    usePurchasedList,
    useTheme,
    useShoppingCart,
    useUserData,
    useProducts,
    useProfilePicture,
};
