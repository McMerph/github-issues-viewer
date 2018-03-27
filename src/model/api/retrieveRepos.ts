import IRepo from "../entities/IRepo";
import IReposSettings from "../entities/IReposSettings";
import URIS from "./uris";
import NotModifiedError from "./NotModifiedError";

interface IRetrieveReposResponse {
  settings: IReposSettings;
  page: IRepo[];
  link?: any;
  eTag: string;
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

function retrieveRepos(parameters: IReposSettings, requestETag?: string): Promise<IRetrieveReposResponse> {
  const { login, pageNumber, perPage } = parameters;
  let eTag: string;
  let link: string | undefined;

  let requestHeaders: {} = {
    Accept: "application/vnd.github.v3+json",
  };
  if (requestETag) {
    requestHeaders = { ...requestHeaders, "If-None-Match": requestETag };
  }
  return fetch(`${URIS.ROOT}/${URIS.USERS}/${login}/${URIS.REPOS}?page=${pageNumber}&per_page=${perPage}`, {
    headers: requestHeaders,
    method: "get",
  })
    .then((response) => {
      if (response.ok) {
        eTag = response.headers.get("etag") || "";
        link = response.headers.get("link") || undefined;

        return response.json();
      } else if (response.status === 304) {
        throw new NotModifiedError();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((json) => {
      if (isReposArrayJson(json)) {
        const page: IRepo[] = json.map((repo) => ({
          issues: repo.open_issues_count,
          name: repo.name,
        }));
        const settings: IReposSettings = { login, perPage, pageNumber };
        return { eTag, link, page, settings };
      } else {
        throw new Error("Invalid format");
      }
    });
}

export default retrieveRepos;
export { IRetrieveReposResponse };
