import * as parse from "parse-link-header";
import IRepo from "../entities/repos/IRepo";
import IReposRequest from "../entities/repos/IReposRequest";
import IResponseParameters from "./IResponseParameters";
import IRetrieveReposResponse from "./IRetrieveReposResponse";
import URIS from "./uris";
import { getError, getQueryParams, getRequestInit, handleResponse } from "./utils";

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

function retrieveRepos(request: IReposRequest, requestETag?: string): Promise<IRetrieveReposResponse> {
  const { login, pageNumber, perPage } = request;
  let responseParameters: IResponseParameters = {};

  return fetch(
    `${URIS.ROOT}/${URIS.USERS}/${login}/${URIS.REPOS}${getQueryParams(pageNumber, perPage)}`,
    getRequestInit(requestETag),
  )
    .then((response) => {
      responseParameters = handleResponse(response);
      return response.json();
    })
    .then((json) => {
      if (isReposArrayJson(json)) {
        const page: IRepo[] = json.map((repo) => ({
          issues: repo.open_issues_count,
          name: repo.name,
        }));
        const { eTag, link } = responseParameters;
        const hasNext: boolean = (link && !!parse(link).next) || false;
        return { eTag: eTag || "", hasNext, page };
      } else {
        throw getError(json, responseParameters, "Error while retrieve repos");
      }
    });
}

export default retrieveRepos;
