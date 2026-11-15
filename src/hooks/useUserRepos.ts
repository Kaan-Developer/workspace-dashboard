import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "@/services/github";

export const useUserRepos = (username: string) => 
  useQuery({
    queryKey: ["github", "repos", username],
    queryFn: () => getUserRepos(username),
    staleTime: 5 * 60 * 1000,
  });
