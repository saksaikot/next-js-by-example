import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";
const FIVE_MINUTES = 60 * 5 * 100;
const USER_QUERY_KEY = "user";

export function useSignIn() {
  const queryClient = useQueryClient();

  const signinMutation = useMutation(async ({ email, password }) => {
    const user = await fetchJson(`/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return user;
  });
  return {
    signInError: signinMutation.isError,
    signInLoading: signinMutation.isLoading,
    signIn: async ({ email, password }) => {
      try {
        const user = await signinMutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);
        return user;
      } catch (error) {
        return undefined;
      }
    },
  };
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => fetchJson("/api/logout"));
  return {
    signOut: async () => {
      try {
        await mutation.mutateAsync();
        queryClient.setQueryData(USER_QUERY_KEY, undefined);
      } catch (error) {}
    },
  };
}

export function useUser() {
  const { data: user } = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        const response = await fetchJson("/api/user");
        return response;
      } catch (error) {
        return undefined;
      }
    },
    {
      staleTime: FIVE_MINUTES,
      cacheTime: Infinity,
    }
  );
  return user;
}
