type GithubRepo = {
  name: string;
};

export type GithubCommit = {
  sha: string;
  html_url: string;
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

export const getUserCommits = async (username: string) => {
  try {
    const repos = await getUserRepos(username);

    const commitRequests = repos.map(async (repo: { name: string }) => {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`,
      );

      if (!response.ok) {
        return [];
      }

      return response.json();
    });

    const commits = await Promise.all(commitRequests);

    return commits.flat();
  } catch (error) {
    console.error("Github API Error:", error);
    throw error;
  }
};
