import { useQuery } from "@tanstack/react-query";
import { getUserCommits } from "@/services/github";

export const useWeeklyCommits = (username: string) => {
    const start = new Date();
    start.setDate(start.getDate() -6);
    const sinceDate = start.toLocaleDateString("en-CA");

    return useQuery({
        queryKey: ["github-commits", username, sinceDate],
        queryFn: ({ signal }) => getUserCommits(username, sinceDate, signal),
        staleTime: 5 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
    });
};