type GithubRepo = {
  name: string;
};

export type GithubCommit = {
  sha: string;
  html_url: string;
  author: { login: string } | null;
  commit: {
    message: string;
    author: {
      date: string;
      name: string;
    } | null;
  };
};

export const getUserRepos = async (username: string): Promise<GithubRepo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    );

    if (!response.ok) {
      throw new Error("Github user not found");
    }

    return await response.json();
  } catch (error) {
    console.error("Github API Error:", error);
    throw error;
  }
};

export const getUserCommits = async (
  username: string,
  sinceDate: string,
  signal?: AbortSignal,
): Promise<GithubCommit[]> => {
  const q = `author:${username} author-date:>=${sinceDate}`;
  const response = await fetch(
     `https://api.github.com/search/commits?q=${encodeURIComponent(q)}&sort=author-date&order=desc&per_page=100`,
    { signal },
  );
  if (!response.ok) throw new Error(`Github API ${response.status}`);
  const data = await response.json();
  return data.items as GithubCommit[];
};