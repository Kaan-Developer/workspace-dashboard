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

export const getUserCommits = async (username: string, since: string) => {
  try {
    const repos = await getUserRepos(username);

    const commitRequests = repos.map(async (repo: GithubRepo) => {
      const response = await fetch(
        `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/commits?since=${encodeURIComponent(since)}&per_page=100`,
      );

      // GitHub returns 409 when a repository has no commits yet.
      if (response.status === 409) return [] as GithubCommit[];

      if (!response.ok) {
        const message = await response.text();
        throw new Error(
          `GitHub API ${response.status} (${repo.name}): ${message}`,
        );
      }

      return response.json();
    });

    const commits = (await Promise.all(commitRequests)).flat();
    const uniqueCommits = new Map(
      commits
        .filter((commit) => commit.author?.login.toLowerCase() === username.toLowerCase())
        .map((commit) => [commit.sha, commit]),
    );

    return [...uniqueCommits.values()].sort(
      (first, second) =>
        new Date(second.commit.author?.date ?? 0).getTime() -
        new Date(first.commit.author?.date ?? 0).getTime(),
    );
  } catch (error) {
    console.error("Github API Error:", error);
    throw error;
  }
};
