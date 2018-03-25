import ApiState from "../entities/ApiState";
import IRepo from "../entities/IRepo";
import IReposPage from "../entities/IReposPage";
import URIS from "./uris";

interface IReposPageResponse {
  page: IReposPage;
  linkHeader?: any;
}

interface IRepoJson {
  name: string;
  open_issues_count: number;
}

function isReposArrayJson(repos: any): repos is IRepoJson[] {
  return Array.isArray(repos) && repos.every((repo) => isRepoJson(repo));
}

function isRepoJson(repo: any): repo is IRepoJson {
  return typeof repo.name === "string" &&
    typeof repo.open_issues_count === "number";
}

export default function retrieveRepos(login: string, page: number): Promise<IReposPageResponse> {
  let eTagHeader: string | undefined;
  let linkHeader: string | undefined;

  // TODO per_page=100 after tests
  return fetch(`${URIS.ROOT}/${URIS.USERS}/${login}/${URIS.REPOS}?page=${page}&per_page=10`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
    method: "get",
  })
    .then((response) => {
      if (response.ok) {
        eTagHeader = response.headers.get("etag") || undefined;
        linkHeader = response.headers.get("link") || undefined;

        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((json) => {
      if (isReposArrayJson(json)) {
        const repos: IRepo[] = json.map((repo) => ({
          issues: repo.open_issues_count,
          name: repo.name,
        }));
        return {
          linkHeader,
          page: {
            apiState: ApiState.Success,
            eTag: eTagHeader,
            repos,
          },
        };
      } else {
        throw new Error("Invalid format");
      }
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation: " + error.message);
      return { page: { apiState: ApiState.Error } };
    });
}
