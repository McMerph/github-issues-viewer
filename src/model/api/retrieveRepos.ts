import * as parse from "parse-link-header";
import IRepo from "../entities/repos/IRepo";
import IReposRequest from "../entities/repos/IReposRequest";
import IRetrieveReposResponse from "./IRetrieveReposResponse";
import NotModifiedError from "./NotModifiedError";
import URIS from "./uris";

interface IRepoJson {
  name: string;
  open_issues_count: number;
}

function isReposArrayJson(repos: any): repos is IRepoJson[] {
  return Array.isArray(repos) &&
    repos.every((repo) =>
      typeof repo.name === "string" &&
      typeof repo.open_issues_count === "number");
}

function retrieveRepos(parameters: IReposRequest, requestETag?: string): Promise<IRetrieveReposResponse> {
  const { login, pageNumber, perPage } = parameters;
  let eTag: string;
  let hasNext: boolean;

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
        const link = response.headers.get("link");
        hasNext = (link && !!parse(link).next) || false;

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
        return { eTag, hasNext, page };
      } else {
        throw new Error("Invalid format");
      }
    });
}

export default retrieveRepos;
