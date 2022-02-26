import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api.js";
import { CART_ITEMS_KEY } from "./queryKeys.js";
const FIVE_MINUTES = 60 * 5 * 1000;
export function useCartItems() {
  return useQuery(
    CART_ITEMS_KEY,
    async () => {
      try {
        const response = await fetchJson("/api/cart-items");
        const selected = {};
        let total = 0;
        response.forEach((item) => {
          item.total = item.quantity * item.price;
          total += item.total;
          selected[item.product_id] = true;
        });
        // console.log("useCartItems", response);
        return { cartItems: response, selected, total };
      } catch (error) {
        return { cartItems: [], selected: {}, total: 0 };
      }
    },
    {
      staleTime: FIVE_MINUTES,
      cacheTime: Infinity,
      initialData: { cartItems: [], selected: {} },
    }
  ).data;
}
export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation(async (cart_id) => {
    const item = await fetchJson(`/api/cart-items/${cart_id}`, {
      method: "DELETE",
    });

    return item;
  });
  const handleDelete = async (cart_id) => {
    try {
      const remove = await mutation.mutateAsync(cart_id);
      queryClient.invalidateQueries(CART_ITEMS_KEY);
      // queryClient.setQueryData(CART_ITEMS_KEY, user);
      return remove;
    } catch (error) {
      return undefined;
    }
  };
  return { handleDelete, deleteLoading: mutation.isLoading };
}
export function useHandleCartItem() {
  const queryClient = useQueryClient();
  const { cartItems, selected } = useCartItems();

  const mutation = useMutation(async ({ product, quantity }) => {
    const items = await fetchJson(`/api/cart-items`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ product, quantity }),
    });

    return items;
  });
  const handleQuantity = async (product, quantity) => {
    console.log("[handleQuantity]", product, quantity);
    if (isNaN(quantity)) {
      //no items in the cart
      const hasProduct = cartItems.filter(
        (item) => item.product_id === product
      );
      if (hasProduct.length === 0) quantity = 1;
      else return;
    }
    if (quantity < 1) return;
    try {
      const item = await mutation.mutateAsync({ product, quantity });
      queryClient.invalidateQueries(CART_ITEMS_KEY);
      // queryClient.setQueryData(CART_ITEMS_KEY, user);
      return item;
    } catch (error) {
      return undefined;
    }
  };
  return {
    increase: (product, quantity) => {
      handleQuantity(product, quantity + 1);
    },
    decrease: (product, quantity) => handleQuantity(product, quantity - 1),
    loading: mutation.isLoading,
    isSelected: (product_id) => selected[product_id],
  };
}
