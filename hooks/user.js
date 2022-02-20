import { useQuery } from "react-query";
import { fetchJson } from "../lib/api";
const FIVE_MINUTES = 60 * 5 * 100;

export function useUser() {
  const { data: user } = useQuery(
    "user",
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
