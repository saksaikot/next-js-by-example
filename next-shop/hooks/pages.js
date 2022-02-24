import { useMutation, useQuery, useQueryClient } from "react-query";
const PAGE_CART_QUERY_KEY = "page_cart_open";

export function useCartOpen() {
  const { data } = useQuery(PAGE_CART_QUERY_KEY, () => true, {
    staleTime: Infinity,
  });
  // console.log("useCartOpen", data);
  return data;
}
export function useSetCartOpen() {
  const queryClient = useQueryClient();
  const cartOpen = useCartOpen();
  return {
    setCartOpen: () => queryClient.setQueryData(PAGE_CART_QUERY_KEY, !cartOpen),
  };
}
