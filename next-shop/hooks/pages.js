import { useMutation, useQuery, useQueryClient } from "react-query";
import { PAGE_CART_OPEN_KEY } from "./queryKeys.js";
export function useCartOpen() {
  const { data } = useQuery(
    PAGE_CART_OPEN_KEY,
    () => false,
    {
      staleTime: Infinity,
    },
    { initialData: false }
  );
  // console.log("useCartOpen", data);
  return data;
}
export function useSetCartOpen() {
  const queryClient = useQueryClient();
  const cartOpen = useCartOpen();
  return {
    setCartOpen: () => queryClient.setQueryData(PAGE_CART_OPEN_KEY, true),
    toggleCartOpen: () =>
      queryClient.setQueryData(PAGE_CART_OPEN_KEY, !cartOpen),
  };
}
