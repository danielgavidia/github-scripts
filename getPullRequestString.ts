import type { GithubResponse } from "./types";

export const getPullRequestString = (githubResponse: GithubResponse): string => {
  const { html_url, title } = githubResponse;
  const pullRequestString = `${html_url}: ${title}`;
  return pullRequestString;
};
